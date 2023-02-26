import React, { Component } from 'react'
import './navbar.css'
import Aicte from '../../images/AICTE-Logo-250x250-1.webp'
export class navbar extends Component {
  render() {
    return (
      <div>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src={Aicte} alt="" className='imageaicte'/></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/project">Project</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/approval">Approval</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/events">Events</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contact">contact</a>
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