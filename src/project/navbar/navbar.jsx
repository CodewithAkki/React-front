import React, { Component } from 'react'
import './navbar.css'
import Aicte from '../../images/AICTE-Logo-250x250-1.webp'
import {  Link } from "react-router-dom";

export class navbar extends Component {
  render() {
    return (
      <div>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#"><img src={Aicte} alt="" className='imageaicte'/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/project">Project</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/approval">Approval</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/events">Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
    
      </ul>
    </div>
  </div>
</nav>


      </div>
    )
  }
}

export default navbar