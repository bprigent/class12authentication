import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logout } from "./api";
import { UserContext } from './UserContext';


const Home = () => {

  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from api.js
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <h2>Homepage</h2>
      {user ? <p>{user.email}</p> : <p>No User Account Loged In</p>}
      <br />
      <Link to="/login">Login</Link>
      <br /><br />
      <Link to="/register">Register</Link>
      <br /><br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;