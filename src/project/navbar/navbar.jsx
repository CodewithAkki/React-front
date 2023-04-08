import React, { Component } from 'react'
import './navbar.css'
import Aicte from '../../images/AICTE-Logo-250x250-1.webp'
import {  Link } from "react-router-dom";

export class navbar extends Component {
  render() {
    return (
      <div>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="#"><img src={Aicte} alt="" className='imageaicte'/></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" to="/login">Login</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/project">Project</Link>
        </li>
        {/* <li class="nav-item">
          <Link class="nav-link" to="/approval">Approval</Link>
        </li> */}
        <li class="nav-item">
          <Link class="nav-link" to="/events">Events</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/about">About</Link>
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