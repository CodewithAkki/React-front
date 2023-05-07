import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import NavbarComp from "../components/NavbarComp";
import swal from "sweetalert";
import axios from "axios";
import { storage } from "../firebase";
import { Outlet, Link } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "react-uuid";
import './project.css'

function Project() {
  const picurl = "";
  const [progress, setProgress] = useState(0);
  const [patentInfo, setPatentInfo] = useState(false);
  const [projectcard, setProjectCard] = useState(true);
  const [newBtnShow, setnewBtnShow] = useState(true);
  const [newBtnShow1,setnewBtnShow1] = useState(false)
  
  const [Storage_link, imageurl] = useState();

  const url = "http://127.0.0.1:8000/project/";
  
  const [data, setData] = useState({
    projectName: "",
    description: "",
    endDate: "",
    domain: "",
    type: "",
    patent: "true",
    Patent_Info: "",
    Storage_link: "",
    user:""
  });

  const [data_user, setData_user] = useState({
    first_name: "",
    last_name: "",
    email: "",
    college:"",
    contact_no: "",
    role:"",
    address:"",
    department:"",
    university:"",
    profilePic:""
  });

  const email= localStorage.getItem("email");
  const contact_no= localStorage.getItem("contact_no");
  const userId=localStorage.getItem("userId");
  const role=localStorage.getItem("role");
  const first_name= localStorage.getItem("first_name");
  const last_name= localStorage.getItem("last_name");
  const college= localStorage.getItem("college");
  const picture = localStorage.getItem("picture");
  const state = localStorage.getItem("state");
  const department = localStorage.getItem("department");
  const university = localStorage.getItem("university");

  const [imageUpload, setImageUpload] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  let imgUrl_ ;
  // const customViewsArray =  [new google.picker.DocsView()]; // custom view
  const uploadfile = (files) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        
        setProgresspercent(progress);

      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(imageRef).then((downloadURL) => {
          setData({...data,Storage_link:downloadURL});
          
          submit(downloadURL);

        });
      }
    );
};

const uploadfileUpdate = (files) => {
  if (imageUpload == null) return;
  const imageRef = ref(storage, `images/${imageUpload.name}`);
  const uploadTask = uploadBytesResumable(imageRef, imageUpload);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      
      setProgresspercent(progress);

    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(imageRef).then((downloadURL) => {
        setData({...data,Storage_link:downloadURL});
        
        updateprofile(downloadURL);

      });
    }
  );};

  function updateprofile(downloadURL){
    fetch('http://localhost:8000/users/'+userId, {
      method: 'PATCH',
      body: JSON.stringify({
        
          first_name: data_user.first_name,
          last_name: data_user.last_name,
          college:data_user.college,
          department: data_user.department,
          university: data_user.university,
          phone_no: data_user.contact_no,
          address: data_user.address,
          email: data_user.email,
          profilePic: downloadURL
        
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    setPatentInfo(true);
    console.log("santosh", newdata);
  }

  function editProfile(){
{/**
Name :   Somesh Kamble

department :   CSE

Role :   Student

University :   Pune University

college :   Sighgad college of engineering

State :   Maharashtra

email :   someshkamble@gmail.com

*/}
    Swal.fire({
      title: 'Login Form',
      html: `
      
      <input type="text" id="name" class="swal2-input" value=`+email+` placeholder="Name" style="width:400px;">
      <input type="text" id="department" class="swal2-input" value=`+department+` placeholder="Department" style="width:400px">
      <input type="text" id="contact_no" class="swal2-input" value=`+contact_no+` placeholder="contact no" style="width:400px">
      <input type="text" id="role" class="swal2-input"  value=`+role+` placeholder="Role" style="width:400px">
      <input type="text" id="university" class="swal2-input" value=`+university+` placeholder="University" style="width:400px">
      <input type="text" id="college" class="swal2-input" value=`+college+` placeholder="college" style="width:400px">
      <input type="text" id="state" class="swal2-input" value=`+state+` placeholder="State" style="width:400px">
      <input type="text" id="email" class="swal2-input" value=`+email+` placeholder="email" style="width:400px">
      <input type="file" id="profilepic" class="swal2-input"  placeholder="profile" style="width:400px">
      
      `,
      customClass: 'swal-wide',
      confirmButtonText: 'Edit',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value
        const department = Swal.getPopup().querySelector('#department').value
        const role = Swal.getPopup().querySelector('#role').value
        const contact_no = Swal.getPopup().querySelector('#contact_no').value
        const university = Swal.getPopup().querySelector('#university').value
        const college = Swal.getPopup().querySelector('#college').value
        const state = Swal.getPopup().querySelector('#state').value
        const email = Swal.getPopup().querySelector('#email').value
        const profilepic = Swal.getPopup().querySelector('#profilepic').value
        if (!name || !department || !role || !university || !college || !state || !email ) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
        return { 
                 name: name, 
                 department: department,
                 role:role,
                 university:university,
                 college:college,
                 state:state,
                 email:email,
                 profilepic:profilepic,
                 contact_no:contact_no
                }
      }
    }).then((result) => {

      {/*
           first_name: "",
    last_name: "",
    email: "",
    college:"",
    contact_no: "",
    role:"",
    address:"",
    department:"",
    university:""
    */}
      const file =result.value.profilepic
      
      const names = result.value.name.split()
      setData_user({...data_user,first_name:names[0]});
      setData_user({...data_user,last_name:names[1]});
      setData_user({...data_user,email:result.value.email});
      setData_user({...data_user,college:result.value.college});
      setData_user({...data_user,contact_no:result.value.contact_no});
      setData_user({...data_user,role:result.value.role});
      setData_user({...data_user,address:result.value.address});
      setData_user({...data_user,department:result.value.department});
      setData_user({...data_user,university:result.value.university});
      uploadfileUpdate(file);

      Swal.fire(`
        name: ${result.value.name}
        department: ${result.value.department}
        role:${result.value.role}
        university:${result.value.university}
        college:${result.value.college}
        state:${result.value.state}
        email:${result.value.email}
        profilepic:${result.value.profilepic}
      `.trim())
    })

  }


  const handleShow = () => {
    setShow(true);
    setProjectCard(false);
    setnewBtnShow(false);
    setnewBtnShow1(true);
  };
  const handleShow1 = () => {
    setProjectCard(true);
    setnewBtnShow(true);
    setnewBtnShow1(false);
    setShow(false);
  };
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);

  const fetchData = () => {
    return fetch("http://localhost:8000/project/Domain/")
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  function submit (downloadURL){
    
   
    axios
    .post(url, {
      name: data.projectName,
      end_date: data.endDate,
      type: data.type,
      description: data.description,
      Storage_link:downloadURL,
      domain: data.domain,
      is_patent: data.patent,
      patent_info: data.Patent_Info,
      user:userId
    }).then((res) => {
      
      swal({
        title: "Good job!",
        text: "you created project successfully!",
        icon: "success",
        button: "ok",
      });

      
      window.location.reload(false)
    })
  }
          
          
          
{/*

  <h5 className="my-3">{first_name+" "+last_name}</h5>
                <p className="text-muted mb-1">{role}</p>
                <p className="text-muted mb-4">{college}</p>
                <p className="text-muted mb-4">{email}</p>

*/}


  return (
    
    <div>
      <NavbarComp />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="userProfile"
          style={{
            width:"400px",
            border:"1px solid #000000",
            height:"85%",
            position:"absolute"
          }}
          >
                <img className="imag" alert="profile photo" src={picture}
                style={{
                  width:"100%",
                  marginLeft:"0px",
                  borderRadius:"50%"
                }}
                />
                <p style={{marginTop:"50px",marginLeft:"40px"}}>Name :&nbsp; &nbsp;{first_name+" "+last_name}</p>
                <p style={{marginTop:"5px",marginLeft:" 0px"}}>department :&nbsp; &nbsp;{department}</p>
                
                <p style={{marginTop:"0px",marginLeft:"45px"}}>Role :&nbsp; &nbsp;{role}</p>
                <p style={{marginTop:"5px",marginLeft:"5px"}}>University :&nbsp; &nbsp;{university}</p>

                <p style={{marginTop:"5px",marginLeft:"25px"}}>college :&nbsp; &nbsp;{college}</p>
                <p style={{marginTop:"5px",marginLeft:"40px"}}>State :&nbsp; &nbsp;{state}</p>

               
                <p style={{marginTop:"5px",marginLeft:"40px"}}>email :&nbsp; &nbsp;{email} </p>
                {/*<input
                          type="file"
                          id="projectName"
                          placeholder="projectName"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                          
                          style={{
                           marginTop:"5px"
                          }}
                        />*/}
                <button
                        type="button"
                        className="btn btn-primary mb-3"
                        onClick={editProfile}
                        style={{
                          marginLeft:"2px"
                        }}
                      >
                        edit
                      </button>
          </div>
           
        
          <div className="col-sm-0">
          {newBtnShow &&  <button
              style={{
                width: "10%",
                float: "right",
                position: "relative",
                marginTop: "0px",
              }}
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={handleShow}
            >
              + &nbsp; &nbsp;New Project
            </button>}
            {newBtnShow1 &&  <button
              style={{
                width: "10%",
                float: "right",
                position: "relative",
                marginTop: "0px",
              }}
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={handleShow1}
            >
              - &nbsp; &nbsp;New Project
            </button>}
            {projectcard && <ProjectCard />}

            <div className="back">
              {/* <firebase /> */}
              {show && (
                <div className="container" style={{ width: "50%" , marginLeft:"550px"}}>
                  <h3 className="mb-5">Project</h3>
                  <form>
                    <div className="middel_section">
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          onChange={(e) => handle(e)}
                          id="projectName"
                          value={data.projectName}
                          placeholder="Project Name"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="checkbox"
                          onChange={(e) => handle(e)}
                          id="patent"
                          value={data.patent}
                        />{" "}
                        is Patent
                      </div>
                      {patentInfo && (
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            onChange={(e) => handle(e)}
                            id="Patent_Info"
                            value={data.Patent_Info}
                            placeholder="Patent Info"
                            className="form-control form-control-lg"
                          />
                        </div>
                      )}
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          onChange={(e) => handle(e)}
                          id="description"
                          value={data.description}
                          placeholder="description"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="date"
                          onChange={(e) => handle(e)}
                          id="endDate"
                          value={data.endDate}
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <select
                          value={data.domain}
                          className="form-control form-control-lg"
                          onChange={(e) => handle(e)}
                          id="domain"
                        >
                          <option selected>Select option</option>
                          {user &&
                            user.map((data) => (
                              <option value={data.id}>{data.name}</option>
                            ))}
                        </select>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="radio"
                          onChange={(e) => handle(e)}
                          id="type"
                          value="Public"
                          name="repoType"
                        />{" "}
                        Public
                        <input
                          type="radio"
                          style={{ marginLeft: "10px" }}
                          onChange={(e) => handle(e)}
                          id="type"
                          name="repoType"
                          value="Private"
                        />{" "}
                        Private
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="file"
                          id="projectName"
                          placeholder="projectName"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mb-3"
                        onClick={uploadfile}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;

const ProjectCard = () => {
  const [user, setUser] = useState([]);
  const fetchData = () => {
    const userId=localStorage.getItem("userId")
    return fetch("http://localhost:8000/project/")
      .then((response) => response.json())
      .then((data) =>{
      data=data.filter((e)=>e.user== userId || e.type==="Public")
      setUser(data)});//.reverse())});
  
  };
  const details = (e) => {
console.log(e);
  Swal.fire({
    title: 'Login Form',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
    <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: 'Sign in',
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Please enter login and password`)
      }
      return { login: login, password: password }
    }
  }).then((result) => {
    Swal.fire(`
      Login: ${result.value.login}
      Password: ${result.value.password}
    `.trim())
  })


}

function deleteProject(e){
 
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

      axios
      .delete("http://localhost:8000/project/"+e+"/")
      .then(response => {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        window.location.reload(false)
      })

      
      
    }
  })

}



  useEffect(() => {
    fetchData();
  }, []);
  console.log(user);
  return (
    
    <div className="container">
      <div className="row">

        {user &&
          user.length > 0 &&
          user.map((userData, index) => (
            <div className="col-6 mt-5 ml-5" style={{ marginLeft: "350px" }}>
              <div
                className="card"
                style={{ width: "50rem",height:"90%", marginLeft: "150xp" }}
              >
                <div className="card-body">
                  <p
                    className="card-title mb-5 mt-3"
                    style={{ marginLeft: "10px" }}
                  >
                    {/*<a
                      href={userData.Storage_link}
                      style={{ textDecoration: "none",fontSize:"1.4rem" }}
          >*/}
             <Badge className="m-2" pill bg="secondary"
             style={{
                position:"absolute",
                right:"0%",
                
             }}
             >
                      {userData.type}
                    </Badge>
                      <h3>{userData.name} </h3>
              {/*      </a>     */}
                 
                    <p style={{fontSize:"0.8rem"}}>Updated on {userData.end_date}</p>
                  <p>{userData.description.slice(0, 202)}...</p>
                  </p>
                  
                  <button
                        type="button"
                        className="btn  mb-3"
                        
                        onClick={() => details(userData.id)}
                        style={{
                          width:"150px",
                          marginTop:"-50px",
                          marginLeft:"0px",
                          background:"#808080",
                          borderColor:"#808080",
                          color:"white",
                          fontWeight:"bold"
                        }}
                        
                      >
                        details
                      </button>
                      <button
                        type="button"
                        className="btn  mb-3"
                        onClick={() => deleteProject(userData.id)}

                        style={{
                          width:"150px",
                          marginTop:"-50px",
                          marginLeft:"25px",
                          background:"red",
                          borderColor:"red",
                          color:"white",
                          fontWeight:"bold"
                        }}
                       
                      >
                        delete
                      </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};