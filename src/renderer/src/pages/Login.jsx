import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import credentials from './../credentials/credentials.json'; // Import the JSON file
import './../styles/login.css';
import Logo from '../layouts/Logo';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Find the user with matching credentials
    const user = credentials.find(
      (user) => user.id === id && user.password === password
    );

    if (user) {
      navigate('/email', { state: { user } });
    } else if(id === 'developer' && password === 'pass'){
      navigate('/developer',{state: {user}});
    }
    else {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <img src="https://res.cloudinary.com/dvmuf6jfj/image/upload/v1739604535/Portfolio/CERTIYFNOW_vlocwl.png" alt="logo" className="logox" />
     
      <div className="mainholder">
      <div className="loginjk">
      <div className="loginbox">
          <h1>Login</h1>
          <div className='inputbox'>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              placeholder='Enter your ID'
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter your Password'
            />
          </div>
          {error && <p>{error}</p>}
        </div>

        {/* Moved the button completely outside loginbox */}
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
      </div>
    </div>
  );
};

export default Login;
