import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './profiledetail.css';

function ProfileDetail() {
  const location = useLocation();
  const { profile, skill } = location.state; 
  const [questionContent, setQuestionContent] = useState('');
  if (!profile) {
    return <p>No profile data available.</p>;
  }

  
  const matchedSkill = profile.skills.find(skillObj => skillObj.skillName.toLowerCase() === skill.toLowerCase());
  

  const handleQuestionSubmit = () => {
    
    console.log('Question submitted:', questionContent);
    
    setQuestionContent('');
  };
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
       
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-role">{profile.currentJobRole}</p>
        </div>
      </div>
      <div className="detail-card">
          <h3>Description</h3>
          <p>{profile.briefBio}</p>
        </div>
      <div className="profile-details">
        

        {matchedSkill ? (
          <>
           
            <div className="detail-card">
              <h3>Skill Acquisition Pathway</h3>
              <p>{matchedSkill.skillAcquisition}</p>
            </div>
          </>
        ) : (
          <p>No matching skill found for "{skill}".</p>
        )}

      </div>
      <div className="ask-question-container">
  <input
    className="ask-question-textarea"
    placeholder="Ask a question..."
    value={questionContent}
    onChange={(e) => setQuestionContent(e.target.value)}
  />
  <button className="send-question-button" onClick={handleQuestionSubmit}>
    Send
  </button>
</div>

    </div>
  );
}

export default ProfileDetail;


