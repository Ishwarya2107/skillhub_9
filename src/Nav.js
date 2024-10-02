
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCoins, faMessage, faBlog, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; 


function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const handleProfileClick = () => {
    navigate('/edit'); 
    
  };
  const handleQuestionClick = () => {
    navigate('/questions')
  }
  const handleSearch = async () => {
    if (searchTerm) {
      // Perform a GET request to search profiles based on the skill
      const response = await fetch(`/search-profiles?skill=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { skill, profiles } = await response.json();
        
        // Navigate to the results page, passing the search results as state
        navigate('/skillsearch', { state: { skill, profiles } });
      } else {
        console.error('Failed to fetch profiles.');
      }
    }
  };

  return (
    
    <nav className="navbar">
      <div className="navbar-container">
      <div className="navbar-item">
         
          <h1>SkillHub</h1>
        </div>
        <div className="search-bar">
      <input
        type="text"
        placeholder="Search a skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>

        <div className="navbar-item">
          <FontAwesomeIcon icon={faMessage} size="2x" />
          <span>Answer</span>
        </div>
        <div className="navbar-item" onClick={handleQuestionClick}>
          <FontAwesomeIcon icon={faMessage} size="2x" />
          <span>Question</span>
        </div>
        <div className="navbar-item">
          <FontAwesomeIcon icon={faBlog} size="2x" />
          <span>Blogs</span>
        </div>
        <div className="navbar-item" onClick={handleProfileClick}>
          <FontAwesomeIcon icon={faUser} size="2x" />
          <span>Profile</span>
        </div>

        <div className="navbar-item">
          <FontAwesomeIcon icon={faCoins} size="2x" />
          <span>Score</span>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;
