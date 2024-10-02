// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// function SearchResults() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { skill, profiles } = location.state; // Get the skill and search results passed from the search bar
//   const handleProfileClick = (profile) => {
//     navigate('/skillprofile', { state: { profile } }); // Pass the profile object to the detail page
//   };
//   return (
//     <div>
//       <h2>Search Results for "{skill}"</h2>
//       {profiles && profiles.length > 0 ? (
//         profiles.map((profile, index) => (
//           <div key={index} className="profile">
//             {/* Show only the name, and navigate on click */}
//             <p
//               style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
//               onClick={() => handleProfileClick(profile)}
//             >
//               <strong>Name:</strong> {profile.name}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p>No profiles found with the skill "{skill}".</p>
//       )}
//     </div>
//   );
// }

// export default SearchResults;


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './skillsearch.css'; // Assuming you create a CSS file for styles

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { skill, profiles } = location.state;
  
  const handleProfileClick = (profile,skill) => {
    navigate('/skillprofile', { state: { profile, skill } });
  };

  return (
    <div className="search-results-container">
      <h2 className="search-heading">Search Results for "{skill}"</h2>
      <div className="profiles-grid">
        {profiles && profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <div key={index} className="profile-card" onClick={() => handleProfileClick(profile,skill)}>
              <p className="profile-name">
                {profile.name}
              </p>
              <p className="profile-role">
                 {profile.currentJobRole}
              </p>
            </div>
          ))
        ) : (
          <p className="no-results">No profiles found with the skill "{skill}".</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;


