import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Navbar() {
   
    const handleLogout = () => {
        const confirmation = window.confirm('Are you sure you want to logout?');
        if (confirmation) {
          localStorage.clear();
        }
      };
     
    
  return (
    <div className="m-2">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark " >
      <a className="navbar-brand" href="/">
        CabBookingService
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/cars">
              Cars
            </a>
          </li>
          <li className="nav-item ">
            <a className="nav-link" href="/drivers">
              Drivers
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/kyc">
               KYC (Know Your Customer)
            </a>
          </li>
        </ul>
        </div>
        <form className="form-inline p-2">
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleLogout} >LogOut</button>
        </form>
    </nav>
    </div>
  );
}

export default Navbar;
