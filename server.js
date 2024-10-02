const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5001;


const mongoURI = 'mongodb://localhost:27017/skillhub'; 
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  loggedIn: { type: Boolean, default: false }, 
});
const User = mongoose.model('User', userSchema);



const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true  // Ensure that the name is provided
  },
  currentJobRole: {
    type: String,
    required: true  // Ensure that the job role is provided
  },
  briefBio: {
    type: String,
    required: true  // Ensure that the bio is provided
  },
  // Embedded skills array directly in the Profile schema
  skills: [
    {
      skillName: {
        type: String,
        required: true  // Ensure that the skill name is provided
      },
      skillAcquisition: {
        type: String,
        required: true  // Ensure that the acquisition description is provided
      }
    }
  ]
});



const Profile = mongoose.model('Profile', profileSchema);



const session = require('express-session');

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));




app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')));

app.post('/profile', async (req, res) => {
  const {
    name,
    currentJobRole,
    briefBio,
    skills
    
  } = req.body;

  try {
    
    const existingProfile = await Profile.findOne({ name });

    if (existingProfile) {
      
      res.status(400).send("Profile already exists");
    } else {
     
      const newProfile = new Profile({
        name,
        currentJobRole,        
        briefBio,
        skills
        
      });

      
      await newProfile.save();
      

      res.status(201).json({ message: "Profile created successfully", profile: newProfile });
    }
  } catch (error) {
    
    console.error('Error creating profile:', error);
    res.status(500).send("Error processing profile creation");
  }
});

app.get('/current-user-profile', async (req, res) => {
  try {
    const userName = req.session.user.name; // Assuming session contains the user's ID
    const user = await Profile.findOne({ name: userName });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user); // Send user data back
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingUser = await User.findOne({ name });
    
    if (existingUser) {
      res.status(400).send("User details already exist");
    } else {
      const newUser = new User({ name, password,loggedIn:false });
      await newUser.save();
      res.status(201).json({ message: "Signup successful", user: newUser });
    }
  } catch (error) {
    res.status(500).send("Error processing signup");
  }
});
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.clearCookie('connect.sid'); 
    res.status(200).send("Logged out successfully");
  });
});



app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  
  try {
    const user = await User.findOne({ name });

    if (user && user.password === password) {
      req.session.user = user; 
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(400).send("Incorrect username or password");
    }
  } catch (error) {
    res.status(500).send("Error processing login");
  }
});




app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

app.get('/current-user', (req, res) => {
  console.log(req.session); 
  const currentUser = req.session?.user;

  if (currentUser) {
    res.status(200).json(currentUser);
  } else {
    res.status(401).send('User not authenticated');
  }
});




app.get('/user/:name', async (req, res) => {
  try {

    const user = await Profile.findOne({ name: req.params.name });

 
    console.log(user);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found'); 
    }
  } catch (error) {
    console.error('Error retrieving user profile:', error); 
    res.status(500).send('Error retrieving user profile'); 
  }
});
//skill matched profiles
app.get('/search-profiles', async (req, res) => {
  const { skill } = req.query;
  
  try {
    const profiles = await Profile.find({
      'skills.skillName': skill, // Ensure this matches the structure of your database
    });
    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No profiles found' });
    }
    console.log(skill)
    res.json({ skill, profiles }); // Send back the found profiles
  } catch (error) {
    console.error('Error searching profiles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//skill matched profiles
//edit-profile

app.put('/edit-profile', async (req, res) => {
  try {
    const { name, currentJobRole,briefBio,skills } = req.body;
    const userName = req.session.user.name; // Get the current user's name from the session

    // Update the user profile
    const updatedUser = await Profile.findOneAndUpdate(
      { name: userName }, // Find the user by name
      {
        name,
        currentJobRole,
        
        briefBio,
        skills
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send success response
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//edit-profile

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
