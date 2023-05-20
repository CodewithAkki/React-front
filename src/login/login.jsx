import React, { useState } from 'react'
import './login.css'
import Navbar from './navbar/navbar'
import swal from 'sweetalert';
import axios from 'axios';
import NavbarComp from '../components/NavbarComp';
import Swal from 'sweetalert2'
import {  Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../App';

function Login() {
  const url="http://127.0.0.1:8000/login/";
  const [data,setData]=useState(
    {
      "email": "",
      "password": "",
    
    })
const navigate = useNavigate();
    function handle(e){
      const newdata={...data}
      newdata[e.target.id]=e.target.value
      setData(newdata)
      console.log(newdata)
    }

    const forgotPassword=()=>{
      Swal.fire({
        title: 'Login Form',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Enter email">`,
        confirmButtonText: 'Submit',
        focusConfirm: false,
        preConfirm: () => {
          const login = Swal.getPopup().querySelector('#login').value
          if (!login) {
            Swal.showValidationMessage(`Please enter email`)
          }
          return { login: login}
        }
      }).then((result) => {

        var myHeaders = new Headers();
myHeaders.append("Authorization", "token 2f6d6aea3a0c0e194747edb30de3fc427c111c22");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": result.value.login
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/users/SendEmail/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


      })  
    }

    function submit(e){

      e.preventDefault();
if (data.email != "admin@gmail.com" && data.password!="admin") {
      axios.post(url,
        {
          username: data.email,
          password: data.password
        
        }).then(
        res=>{
          if (res.data.message === "login successfully"){
              // console.log("santosh!");
          

               dispatch({type:"USER",payload:true})
            swal({
              title: "Good job!",
              text: "you are Login successfully!",
              icon: "success",
              button: "ok",
            });
              navigate("/");

            console.log(res.data);
            localStorage.setItem("email",res.data.email);
            localStorage.setItem("contact_no",res.data.phone_no);
            localStorage.setItem("userId",res.data.userId);
            localStorage.setItem("role",res.data.role);
            localStorage.setItem("picture",res.data.picture);
            localStorage.setItem("first_name",res.data.first_name);
            localStorage.setItem("last_name",res.data.last_name);
            localStorage.setItem("college",res.data.college);
            localStorage.setItem("state",res.data.address);
            localStorage.setItem("department",res.data.department);
            localStorage.setItem("university",res.data.university);
          }
          else {
            swal({
              title: "try again",
              text: "fail to login",
              icon: "error",
              button: "ok",
            });
          }
         
           } 
    )
          }else {
            navigate("/admin");
          }
          }
     const {state,dispatch}=useContext(UserContext);

  return (
    <div className="login-main">

            <NavbarComp   data={false}/>
           
            
            <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
            </div>
            <div className="col-md-7 col-lg-6 col-xl-4 offset-xl-1 ">
              <form onSubmit={(e)=>submit(e)}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mt-20">
                <h3>Login</h3>
                
                </div>
            
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input type="email" onChange={(e)=>handle(e)} id="email" value={data.email} className="form-control form-control-lg" placeholder="Enter a valid email address" />
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input type="password" onChange={(e)=>handle(e)} id="password" value={data.password} className="form-control form-control-lg" placeholder="Enter password" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}

                  <Link  className="text-body" onClick={forgotPassword}>Forgot password?</Link>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem',marginTop:'30px'}}>Sign In</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/registration" className="link-danger">Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    
    </div>
  )
}

export default Login;