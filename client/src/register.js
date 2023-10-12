import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { register } from './api';


const Register = () => {
  
  // save form data in state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // set navigate for redirect
  const navigate = useNavigate();
  
  // handle change in the form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    try {
      // register user to database
      await register(formData);;
      //testing
      console.log('Registered successfully');
      //redirect to homepage
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
      // handle error - show error message to user
    }
    
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <br /><br />
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default Register;

