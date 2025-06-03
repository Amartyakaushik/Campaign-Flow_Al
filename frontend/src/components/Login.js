// // src/components/Login.js

// import React from 'react';

// const Login = () => {
//   const handleLogin = () => {
//     window.location.href = 'http://localhost:5000/auth/google'; // Update with your backend URL
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;

// // src/components/Login.js

// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     window.location.href = 'http://localhost:5000/auth/google';
//   };

//   // Example of handling redirection after successful login
//   React.useEffect(() => {
//     // Replace this with a real condition based on your authentication state
//     const successfulLogin = true; // Fetch this state from your server or context
    
//     if (successfulLogin) {
//       login();
//       navigate('/dashboard');
//     }
//   }, [login, navigate]);

//   return (
//     <div>
//       <h1>Login</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;

// src/components/Login.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  React.useEffect(() => {
    // Simulate checking local storage or cookie to ensure user is authenticated
    const isLoggedIn = false; // Implement real check here
    console.log("Checking authentication...");

    if (isLoggedIn) {
      login();
      navigate('/dashboard');
    }
  }, [login, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;