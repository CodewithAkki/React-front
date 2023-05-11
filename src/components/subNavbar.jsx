import React from 'react'
import './subNavbar.css'
export default function subNavbar() {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link1 active" aria-current="page" href="">Guid</a>
        <a class="nav-link1 active" href="#">HOD</a>
        <a class="nav-link1 active" href="#">Dean</a>
        <a class="nav-link1 active" href="#">AICTE</a>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}
