import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './feed.css';

function Body() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/current-user'); 
        const result = await response.json();
        setCurrentUser(result);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
   
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users'); 
        const result = await response.json();
       
        const filteredUsers = result.filter(user => user.name !== currentUser?.name);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleUserClick = (name) => {
    navigate(`/user/${name}`); 
  };
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    
    console.log('Post content:', postContent);
    setPostContent(''); 
  };
  return (
    <div className="container">
          <div className="left-rectangle">
      <h3>Create a Post</h3>
      <div className="create-post-container">
        <textarea
          className="create-post-textarea"
          placeholder="What do you want to talk about?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <div className="create-post-actions">
          <div className="create-post-attachment">
            <i className="fas fa-paperclip"></i> {/* Replace with an actual icon if needed */}
            <span>Add a photo or video</span>
          </div>
          <button className="create-post-button" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
      <div className="right-rectangle">
        <h2>Other Profiles</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} onClick={() => handleUserClick(user.name)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Body;
