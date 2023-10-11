import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const Home = () => {
    return (
      <div>
        <h2>Homepage</h2>
        <Link to="/login">Login</Link>
        <br /><br />
        <Link to="/register">Register</Link>
      </div>
    );
  };

  export default Home;