import React, { Component,useContext } from 'react'
import './navbar.css'
import Aicte from '../images/AICTE-Logo-250x250-1.webp'
import {  Link } from "react-router-dom";
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";



const Navbar=(props)=> {
    const user=localStorage.getItem("email");
    const {state,dispatch}=useContext(UserContext);
        const handleLogout=()=>{
            localStorage.clear();
            window.location.href="/"
        }
        console.log("state",state);
    const navigatToprofile=()=>{
        console.log("sidebar here");

    }

    

    const RenderMenu=()=>{
      const role=localStorage.getItem("role")
         if(role=="Student"){
            return (
                <>
                    <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/project">Project</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/approval">Approval</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/event">Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={handleLogout}>Logout</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={navigatToprofile}>Hi {user}</Link>
        </li>

                </>
            )
         }
         else if(role=="AICTE member" | role=="Dean" | role=="Hod" | role=="Guid") {
         return( <>
          <li className="nav-item">
<Link className="nav-link " aria-current="page" to="/">Home</Link>
</li>
<li className="nav-item"> <Link className="nav-link" to="/project">Project</Link>
         </li>
<li className="nav-item">
<Link className="nav-link" to="/approval">Approval</Link>
</li>
<li className="nav-item">
<Link className="nav-link" to="/event">Events</Link>
</li>
<li className="nav-item">
<Link className="nav-link" to="/about">About</Link>
</li>
<li className="nav-item">
<Link className="nav-link" onClick={handleLogout}>Logout</Link>
</li>
<li className="nav-item">
<Link className="nav-link" onClick={navigatToprofile}>Hi {user}</Link>
</li>

      </>
  )
         }
         else{
            return(
                <>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/login">Login</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/event">Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
                </>
            )
         }
    }
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
    
          <RenderMenu/>
      </ul>
    </div>
  </div>
</nav>


      </div>
    )
  
}

export default Navbar