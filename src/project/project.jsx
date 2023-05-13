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
    leader:""
  });
  {/**

    "leader": "somesh@gmail.com",
  "user1": "akshaymithari98@gmail.com",
  "user2": "santoshmithari@gmail.com",
  "user3": "surajmithari@gmail.com",
  "user4": "parthmithari@gmail.com",
  "project": ""

*/}

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
  const [disablity,setdisablity]=useState('');
  let imgUrl_ ;
  // const customViewsArray =  [new google.picker.DocsView()]; // custom view
  const uploadfile = (files) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `projects/${imageUpload.name}`);
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

const uploadfileUpdate = (file) => {
  if (imageUpload == null) return;
  const imageRef = ref(storage, `images/${imageUpload}`);
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
        alert(downloadURL);
        updateprofileImage(downloadURL);
        localStorage.setItem("picture",downloadURL)
        window.location.reload(false)
      });
    }
  );};

  function updateprofileImage(downloadURL){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "profilePic": downloadURL
    });
    
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/users/update/"+userId, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


  }


  function updateprofile(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
  "first_name": data_user.first_name,
  "last_name": data_user.last_name,
  "college": data_user.college,
  "department": data_user.department,
  "university": data_user.university,
  "phone_no": data_user.contact_no,
  "address": data_user.address,
  "birthdate": data_user.birthdate,
  "email": data_user.email,
  "role": data_user.role
});


    
var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/users/update/"+userId, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
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
      title: 'user Form',
      html: `
      
      <input type="text" id="first_name" class="swal2-input" value=`+first_name+` placeholder="First_Name" style="width:400px;">
      <input type="text" id="last_name" class="swal2-input" value=`+last_name+` placeholder="Last_Name" style="width:400px;">
      <input type="text" id="department" class="swal2-input" value=`+department+` placeholder="Department" style="width:400px">
      <input type="text" id="contact_no" class="swal2-input" value=`+contact_no+` placeholder="contact no" style="width:400px">
      <input type="text" id="role" class="swal2-input"  value=`+role+` placeholder="Role" style="width:400px">
      <input type="text" id="university" class="swal2-input" value=`+university+` placeholder="University" style="width:400px">
      <input type="text" id="college" class="swal2-input" value=`+college+` placeholder="college" style="width:400px">
      <input type="text" id="state" class="swal2-input" value=`+state+` placeholder="State" style="width:400px">
      <input type="text" id="email" class="swal2-input" value=`+email+` placeholder="email" style="width:400px">
      
      `,
      customClass: 'swal-wide',
      confirmButtonText: 'Edit',
      focusConfirm: false,
      preConfirm: () => {
        const first_name = Swal.getPopup().querySelector('#first_name').value
        const last_name = Swal.getPopup().querySelector('#last_name').value
        const department = Swal.getPopup().querySelector('#department').value
        const role = Swal.getPopup().querySelector('#role').value
        const contact_no = Swal.getPopup().querySelector('#contact_no').value
        const university = Swal.getPopup().querySelector('#university').value
        const college = Swal.getPopup().querySelector('#college').value
        const state = Swal.getPopup().querySelector('#state').value
        const email = Swal.getPopup().querySelector('#email').value
        if (!last_name||!first_name || !department || !role || !university || !college || !state || !email ) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
        return { 
                 first_name: first_name, 
                 last_name: last_name, 
                 department: department,
                 role:role,
                 university:university,
                 college:college,
                 state:state,
                 email:email,
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
      
      
      setData_user({...data_user,first_name:result.value.first_name});
      setData_user({...data_user,last_name:result.value.last_name});
      setData_user({...data_user,email:result.value.email});
      setData_user({...data_user,college:result.value.college});
      setData_user({...data_user,contact_no:result.value.contact_no});
      setData_user({...data_user,role:result.value.role});
      setData_user({...data_user,address:result.value.address});
      setData_user({...data_user,department:result.value.department});
      setData_user({...data_user,university:result.value.university});

      updateprofile();


    })

  }

function profilechange(){
  Swal.fire({
    title: 'Change Image',
    html: `
    <input type="file" name="choose image" id="profile"/>

    `,
    customClass: 'swal-wide',
    confirmButtonText: 'Edit',
    focusConfirm: false,
    preConfirm: () => {
      const profilepic = Swal.getPopup().querySelector('#profile').value

      if (!profilepic ) {
        Swal.showValidationMessage(`Please enter login and password`)
      }
      return { 
        profilepic:profilepic
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

    uploadfileUpdate(file);


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

  const [assigned,setassigned]=useState([]);
  const fetchAssigned=()=>{
    return fetch("http://localhost:8000/Assigned/"+role+"/"+userId)
    .then(response => response.text())
    .then(result => setassigned(result))
    .catch(error => console.log('error', error));
  }
{/*          Assigned project    */}




  useEffect(() => {
    fetchData();
    fetchAssigned();
  
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
      leader:userId
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
                    <input
                          type="file"
                          id="profile"
                          placeholder="Choose photo"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                          accept="image/x-png,image/gif,image/jpeg" 
                        />
                <button className="btn btn-primary" onClick={uploadfileUpdate}>Edit Profile</button>
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
                          marginLeft:"40px",
                          marginTop:"0px"
                        }}
                      >
                        Edit 
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
                   
                      </div>
                     
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
  const [normal,setnormal]=useState(true);
  const fetchData = () => {
    const userId=localStorage.getItem("userId");

    return fetch("http://localhost:8000/project/")
      .then((response) => response.json())
      .then((data) =>{
        data=data.filter((e)=>e.leader== userId && e.type==="Public")
        if(!data){
          data=data;
          setnormal(false);
        } 
      console.log(data);
      setUser(data)});//.reverse())});
  
  };
  const details = (e) => {
console.log(e);
  Swal.fire({
    title: 'project Form',
    html: `

    <input type="text" id="projectName" class="swal2-input" placeholder="projectName">
    <input type="text" id="description" class="swal2-input" placeholder="description">
    <input type="date" id="endDate" class="swal2-input" placeholder="endDate"></br>
    <input type="radio" id="type" value="Public" name="repoType"/>Public</br>
    <input type="radio" id="type" value="Private" name="repoType"/>Private</br>
    <input type="text" id="Patent_Info" class="swal2-input" placeholder="Patent_Info">
    
    <input type="file" id="login" class="swal2-input" placeholder="choose Project">
   
    `,
    confirmButtonText: 'Sign in',
    focusConfirm: false,
    preConfirm: () => {
      const projectName = Swal.getPopup().querySelector('#projectName').value
      const endDate = Swal.getPopup().querySelector('#endDate').value
      const type = Swal.getPopup().querySelector('#type').value
      const Patent_Info = Swal.getPopup().querySelector('#Patent_Info').value
      const description = Swal.getPopup().querySelector('#description').value
      if (!projectName || !endDate ||!Patent_Info  ||!description ||!type  ) {
        Swal.showValidationMessage(`Please enter login and password`)
      }
      return { projectName: projectName, endDate: endDate,Patent_Info:Patent_Info, description:description,type:type}
    }
  }).then((result) => {
 
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "name": result.value.projectName,
  "is_patent": true,
  "patent_info": result.value.Patent_Info,
  "end_date": result.value.endDate,
  "type": result.value.type,
  "description": result.value.description,
});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/project/"+e+"/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  })


}
const [Groups,setGroups]=useState([]);
const fetchDataGroup = (e) => {
return fetch("http://localhost:8000/project/Group/"+e)
  .then(response => response.json())
  .then(result => setGroups(result))
  .catch(error => console.log('error', error));

};
function createGroup(e){

  fetchDataGroup(e);
  console.log(Groups);
  let leader=(Groups.leader)?Groups.leader:"leader";
  let user1=(Groups.user1)?Groups.leader:"Username";
  let user2=(Groups.user2)?Groups.leader:"Username";
  let user3=(Groups.user3)?Groups.leader:"Username";
  let user4=(Groups.user4)?Groups.leader:"Username";
  Swal.fire({
    title: 'Create Group',
    html: 
    `
    <input type="email" id="user1" class="swal2-input" value=`+leader+` placeholder="Leader">
    <input type="email" id="user2" class="swal2-input" value=`+user1+` placeholder="Username">
    <input type="email" id="user3" class="swal2-input" value=`+user2+` placeholder="Username">
    <input type="email" id="user4" class="swal2-input" value=`+user3+` placeholder="Username">
    <input type="email" id="user5" class="swal2-input" value=`+user4+` placeholder="Username">
    
    `,
    confirmButtonText: 'Submit',
    focusConfirm: false,
    preConfirm: () => {
      const leader = Swal.getPopup().querySelector('#user1').value
      const user2 = Swal.getPopup().querySelector('#user2').value
      const user3 = Swal.getPopup().querySelector('#user3').value
      const user4 = Swal.getPopup().querySelector('#user4').value
      const user5 = Swal.getPopup().querySelector('#user5').value
      if (!leader || !user2 || !user3 || !user4 || !user5) {
        Swal.showValidationMessage(`Please enter username`)
      }
      return { user1: leader, user2: user2, user3: user3, user4: user4 , user5: user5}
    }
  }).then((result) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "leader": result.value.user1,
      "user1": result.value.user2,
      "user2": result.value.user3,
      "user3": result.value.user4,
      "user4": result.value.user5,
      "project": e
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("localhost:8000/project/Group", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
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
const college=localStorage.getItem("college");
const [guid, setguid] = useState([]);
const [guidselection, setguidselection] = useState(true);
const [guidselection1, setguidselection1] = useState(false);
const guidselectionactive=()=>{
  setguidselection(true);
  setguidselection1(false);

}
const guidselectdisactive=()=>{
  setguidselection1(true);
  setguidselection(false);
}
const fetchguid = () => {
  const userId=localStorage.getItem("userId")
 
  return fetch("http://localhost:8000/users/")
    .then((response) => response.json())
    .then((data) =>{
      data=data.filter((e)=>e.college===college && e.role===2)
    console.log(data);
    setguid(data)});//.reverse())});

};

  useEffect(() => {
    fetchData();
    fetchguid();

  }, []);

function projectguidUpdate(){
  const valuedrop = localStorage.getItem("dropdownvalue");
  const project = localStorage.getItem("dropdownproject");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "guid": valuedrop
  });
  
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:8000/project/"+project+"/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
  function selectguid(e,project){
    localStorage.setItem("dropdownvalue",e.target.value);
    localStorage.setItem("dropdownproject",project)
   
      fetch("http://localhost:8000/project/assignedguid/"+e.target.value)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
    
    projectguidUpdate()
    window.location.reload(false)
    }


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
                    <a
                      href={userData.Storage_link}
                      style={{ textDecoration: "none",fontSize:"1.4rem" }}
          >
             <Badge className="m-2" pill bg="secondary"
             style={{
                position:"absolute",
                right:"0%",
                
             }}
             >
                      {userData.type}
                    </Badge>
        

                      <h3>{userData.name} </h3>
                    </a>     
                 
                    <p style={{fontSize:"0.8rem"}}>Updated on {userData.end_date}</p>
                  <p>{userData.description}</p>
                  </p>
                  
                {normal&&<>  <button
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
                      </button></>}
                      <div
                      style={{
                        width:"200px",
                        position:"absolute",
                        right:10,
                        marginTop:"-100px"
                      }}
                      >
                     {normal&&guidselection && <select
             
                          //value={}
                          className="form-control form-control-lg"
                          onChange={(e) => selectguid(e,userData.id)}
                          id="domain"

                          
                        >
                            <option selected>Select option</option>
                          
                          {guid &&
                            guid.map((data) => (
                              
                              <option value={data.id}>{data.first_name+" "+data.last_name}</option>
                            ))}
                        </select>}
                        {guidselection1 || userData.guid &&<input type="text" style={{width:"200px"}}value={userData.guid} disabled/>}
                                  </div>
                      <button
                        type="button"
                        className="btn  mb-3"
                        onClick={() => createGroup(userData.id)}

                        style={{
                          width:"150px",
                          marginTop:"-50px",
                          marginLeft:"25px",
                          background:"black",
                          borderColor:"black",
                          color:"white",
                          fontWeight:"bold"
                        }}
                       
                      >
                        create Group
                      </button>


                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};