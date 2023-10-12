import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from './api';
import { UserContext } from './UserContext';



const Login = () => {
  
  // set credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  
  // set navigate for redirect
  const navigate = useNavigate();

  //get the set user function from UserContext
  const { setUser } = useContext(UserContext);
  
  // handle change in the form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // handle the click on the login button 
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // testing
    console.log('Form data submitted:', credentials);

    try {
      // login user with backend
      const response = await login(credentials);
      // testing
      console.log('Logged in successfully');
      //Store user email in context
      setUser({ email: response.email, username: response.username });
      //redirect to homepage
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      // handle error - show error message to user
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <br /><br />
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default Login;