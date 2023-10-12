import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { login } from './api';
import { UserContext } from './UserContext';



const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  //get the set user function from UserContext
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Email:", credentials.email);
    console.log("Password:", credentials.password);

    try {
      await login(credentials);
      console.log('Logged in successfully');
      //Store user email in context
      setUser({ email: credentials.email });
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