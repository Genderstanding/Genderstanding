import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './WelcomePage.css';


export default function WelcomePage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
           Welcome Page
          </p>


     
        </div>
      </div>
    </div>
  );
}


