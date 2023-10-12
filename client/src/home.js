import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logout } from "./api";
import { UserContext } from './UserContext';


const Home = () => {
  // extract user data from context
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      // Call the logout function from api
      await logout();
      // reload page once lodout is done
      window.location.reload();
      // testing
      console.log('Logged out successfully');
    } catch (error) {
      //log error
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <h2>Homepage</h2>
      {user ? <p>Email: {user.email}, Username: {user.username}</p> : <p>No User Account Loged In</p>}
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