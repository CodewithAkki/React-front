import React, { useState, useEffect, useRef} from "react";
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
import { data } from "jquery";
import './profile.css'

function Profile() {
  const reference = useRef();
 
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
    Patent_Info: "",
    Storage_link: "",
    guid: "",
    leader:"",
    patentNo:"",
    AcademicYear:"",
    semester:""
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


  function updateprofile(email,contact_no,githublink){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "token 2f6d6aea3a0c0e194747edb30de3fc427c111c22");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "phone_no": contact_no ,
  "email": email,
  "githublink":githublink
});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/users/update/1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  window.location.reload(false)
  }

  function handle(e) {
    const newdata = {...data};
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    setPatentInfo(true);
    console.log("santosh", newdata);
  }

  

  function editProfile(){
    let githublink ="";
     if(localStorage.getItem("githublink")==null){
      githublink="Github Link";
    }else{
      githublink=localStorage.getItem("githublink");
    }
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
      <input type="text" id="contact_no" class="swal2-input" value=`+contact_no+` placeholder="contact no" style="width:400px">
      <input type="text" id="email" class="swal2-input" value=`+email+` placeholder="email" style="width:400px">
      <input type="text" id="githublink" class="swal2-input" value=`+githublink+` placeholder="email" style="width:400px">
      `,
      customClass: 'swal-wide',
      confirmButtonText: 'Edit',
      focusConfirm: false,
      preConfirm: () => {
        const contact_no = Swal.getPopup().querySelector('#contact_no').value
        const email = Swal.getPopup().querySelector('#email').value
        const githublink = Swal.getPopup().querySelector('#githublink').value

        if (!contact_no|| !email ||!githublink) {
          Swal.showValidationMessage(`Please enter email or contact or githublink`)
        }
        return { 
                 email:email,
                 contact_no:contact_no,
                 githublink:githublink
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
   
      localStorage.setItem("email",result.value.email);
      localStorage.setItem("contact_no",result.value.contact_no);
      localStorage.setItem("githublink",result.value.githublink);
      updateprofile(result.value.email,result.value.contact_no ,result.value.githublink );
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
    fetchguid();
  }, []);

  console.log(data);

  function submit (downloadURL){
    const userId = localStorage.getItem("userId")
   
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
      leader:userId,
      AcademicYear:data.AcademicYear,
      patentNo:data.patentNo ,
      semester: data.semester,
      guid:data.guid

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
const [normal,setnormal]=useState(true);
const [guids,setguids]=useState([]);



const fetchguid = () => {
    const collegeId=localStorage.getItem("collegeId")
   
    return fetch("http://localhost:8000/users/")
      .then((response) => response.json())
      .then((data) =>{
        data=data.filter((e)=>e.college==collegeId && e.role==2)
      console.log(data);
      setguids(data)});//.reverse())});
  
  };
  const selectguid = (e)=>{
    setData({...data,guid:e});
  }
  let githublink =localStorage.getItem("githublink");
  const roles = localStorage.getItem("role");
return (
    
    <div>
      <NavbarComp />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="userProfile"
          style={{
            width:"400px",
            border:"1px solid #000000",
            height:"1000px",
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
                <button className="btn btn-primary" onClick={uploadfileUpdate}
                style={{
                  marginLeft:"50px",
                }}
                >Edit Profile</button>
                <p style={{marginTop:"50px",marginLeft:"40px"}}>Name :&nbsp; &nbsp;{first_name+" "+last_name}</p>
                <p style={{marginTop:"5px",marginLeft:" 0px"}}>Department :&nbsp; &nbsp;{department}</p>
                <p style={{marginTop:"0px",marginLeft:"45px"}}>Role :&nbsp; &nbsp;{role}</p>
                <p style={{marginTop:"5px",marginLeft:"5px"}}>University :&nbsp; &nbsp;{university}</p>
                <p style={{marginTop:"5px",marginLeft:"25px"}}>College :&nbsp; &nbsp;{college}</p>
                <p style={{marginTop:"5px",marginLeft:"40px"}}>State :&nbsp; &nbsp;{state}</p>
                <p style={{marginTop:"5px",marginLeft:"40px"}}>Email :&nbsp; &nbsp;{email} </p>
                <p style={{marginTop:"5px",marginLeft:"20px"}}>Contact :&nbsp; &nbsp;{contact_no} </p>
                <p style={{marginTop:"5px",marginLeft:"20px"}}>Github Link :&nbsp; &nbsp;{githublink} </p>
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
          {newBtnShow && roles == "Student"&&  <button
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
            {newBtnShow1 && roles == "Student" &&  <button
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
                      <div className="form-outline mb-4" style={{display:"flex"}}>
                        <input
                          type="text"
                          id="patentNo"
                          value={data.patentNo}
                          onChange={(e) => handle(e)}
                          placeholder="Patent No"
                          className="form-control form-control-lg"
                          style={{
                            height:"20px",
                            width:"200px"
                          }}
                        />
                         <textarea
                           rows="4" 
                           cols="50"
                            onChange={(e) => handle(e)}
                            id="Patent_Info"
                            value={data.Patent_Info}
                            placeholder="Patent Info"
                            className="form-control form-control-lg"
                            style={{
                              marginLeft:"20px"
                            }}
                          />
                      </div>
                       

                     
                      <div className="form-outline mb-4">
                        <textarea
                           rows="4" 
                           cols="50"
                          onChange={(e) => handle(e)}
                          id="description"
                          value={data.description}
                          placeholder="description"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-4" style={{display:"flex"}}>
                        <label for="endDate">END DATE</label>
                        <input
                          type="date" 
                          onChange={(e) => handle(e)}
                          id="endDate"
                          value={data.endDate}
                          className="form-control form-control-lg"
                          style={{
                            width:"200px",
                            marginTop:"30px",
                            marginLeft:"-80px"
                          }}
                        />
                           <label  style={{marginLeft:"10px"}}>Academic Year</label>
                        <input
                          type="text" 
                          onChange={(e) => handle(e)}
                          id="AcademicYear"
                          value={data.AcademicYear}
                          className="form-control form-control-lg"
                          style={{
                            width:"200px",
                            marginTop:"30px",
                            marginLeft:"-110px"
                          }}
                        />

                        <select   
                            onChange={(e) => handle(e)}
                            className="form-select"
                            aria-label="Default select example"
                            id="semester"
                            value={data.semester}
                            style={{
                              width:"200px",
                              height:"50px",
                              marginLeft:"10px",
                              marginTop:"30px"
                            }}
                          >{/*
                          
                          1 = I	2 = II	3 = III	4 = IV	5 = V
6 = VI	7 = VII	8 = VIII

                          */}
                             <option selected>Select semester</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value='IV'>IV</option>
                            <option value='V'>V</option>
                            <option value='VI'>VI</option>
                            <option value='VII'>VII</option>
                            <option value='VIII'>VIII</option>
                          </select>

                      </div>
                      <div className="form-outline mb-4">
                        <select
                          value={data.domain}
                          className="form-control form-control-lg"
                          onChange={(e) => handle(e)}
                          id="domain"
                        >
                          <option selected>Select Domain</option>
                          {user &&
                            user.map((data) => (
                              <option value={data.id}>{data.name}</option>
                            ))}
                        </select>
                      </div>
                      <div>
                       {normal&&guids && <select
               
                            //value={}
                            className="form-control form-control-lg"
                            onChange={(e) => selectguid(e.target.value)}
                            id="domain"
  
                            
                          >
                              <option selected>Select Guid</option>
                            
                            {guids &&
                              guids.map((data) => (
                                
                                <option value={data.id}>{data.first_name+" "+data.last_name}</option>
                              ))}
                          </select>}
                                    </div>
                      <div className="form-outline mb-4">
                        <input
                          type="radio"
                          onChange={(e) => handle(e)}
                          id="type"
                          value="Public"
                          name="repoType"
                          style={{
                              marginTop:"20px"
                          }}  
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

export default Profile;

const ProjectCard = () => {
    const [user, setUser] = useState([]);
    const [normal,setnormal]=useState(true);
    const [appval,setappval]=useState(true);
    const role = localStorage.getItem("role");
    const fetchData = () => {
      const userId=localStorage.getItem("userId");
     
      if(role=="Student"){
      return fetch("http://localhost:8000/project/")
        .then((response) => response.json())
        .then((data) =>{
          data=data.filter((e)=> e.leader==userId )
          if(!data){
            data=data;
            setnormal(false);
          } 
        console.log(data);
        setUser(data)});//.reverse())});
        }else if(role=="Guid"){
          return fetch("http://localhost:8000/project/")
          .then((response) => response.json())
          .then((data) =>{
            data=data.filter((e)=> e.guid== userId)
            data.filter((e)=>{
              if(e.isapproval==="Approved"){
                setappval(false)
              }else{
                setappval(true)
              }
             
            })
            if(!data){
              data=data;
              setnormal(false);
            } 
          console.log(data);
          setUser(data)});//.reverse())});
        }
    };

  const [dataProject,set]=useState([]);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const details = (id) => {


      fetch("http://localhost:8000/project/project/"+id+"/")
        .then((response) => response.json())
        .then((data) =>{
        console.log(data);
        set(data)});

console.log(dataProject);
if(dataProject.name!=undefined){
if(dataProject){
  sleep(200000);
  Swal.fire({
    title: '<strong><u>Project Details</u></strong>',
    icon: 'info',
    html:
      `
      <p><b>Project Name :</b>`+dataProject.name+` </p>
      <p><b>Patent No :</b>`+dataProject.patentNo+`</p>
      <p><b>Patent Info :</b>`+dataProject.patent_info+`</p>
      <p><b>Description :</b>`+dataProject.description+`</p>
      <p><b>End Date :</b>`+dataProject.end_date+`</p>
      <p><b>Domain :</b>`+dataProject.domain+`</p>
      <p><b>Type of project :</b>`+dataProject.type+`</p>
      <p><b>Academic Year :</b>`+dataProject.AcademicYear+`</p>
      <p><b>Department:</b>`+dataProject.department+`</p>
      <p><b>Semister :</b>`+dataProject.semester+`</p>
      <p><b>Guid :</b>`+dataProject.guid+`</p>
      <p><b>Leader :</b>`+dataProject.leader+`</p>
      <p><b>group members :</b></p> 

      `,
    showCloseButton: true,
   
    focusConfirm: false,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Great!',
    confirmButtonAriaLabel: 'Thumbs up, great!',
   
    
  })
}
}
  
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
        console.log(e);
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


  const fetchguid = () => {   
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
  function message(e,message){
    console.log("Message:",e);
    Swal.fire({
  title: 'Message',
  html: `<textArea id="login" class="swal2-input" placeholder="Message" cols="20" rows="10"   style="height=1000px;">`+message+`</textArea>
  `,
  customClass: 'swal-wide',
  confirmButtonText: 'Send',
  focusConfirm: false,
  preConfirm: () => {
    const login = Swal.getPopup().querySelector('#login').value
    if (!login ) {
      Swal.showValidationMessage(`Please enter login and password`)
    }
    return { login: login }
  }
}).then((result) => {

  var myHeaders = new Headers();
myHeaders.append("Authorization", "token 2f6d6aea3a0c0e194747edb30de3fc427c111c22");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "message": result.value.login
});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/project/update/"+e, requestOptions)
  .then(response => response.text())
  .then(result => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  })
  .catch(error => console.log('error', error));


 
})
  }

function detailsApproval(e){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "token 2f6d6aea3a0c0e194747edb30de3fc427c111c22");
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "isapproval": "Approved"
  });
  
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:8000/project/updateprojectdata/"+e+"/", requestOptions)
    .then(response => response.text())
    .then(result => {

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.setItem("Approval","false")
    })
    .catch(error => console.log('error', error));

}
let approval=localStorage.getItem("Approval")
  if(role=="Student"){
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
                  <div className="card-body" >
                   
                    <p
                      className="card-title mb-5 mt-3"
                      style={{ marginLeft: "10px" }}
                    >
                                  <Badge className="m-2" pill bg="secondary"
               style={{
                  position:"absolute",
                  right:"0%",
                  
               }}
               >
                        {userData.type}
                      </Badge>
                      <a
                        href={userData.Storage_link}
                        style={{ textDecoration: "none",fontSize:"1.4rem" }}
            ><h3>{userData.name} </h3>
                      </a>  
                      <p style={{fontSize:"0.8rem"}}>End Date {userData.end_date}</p>
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
                        </button>
                        
                        <button
                          type="button"
                          className="btn  mb-3"
                          
                          onClick={() => message(userData.id,userData.message)}
                          style={{
                            width:"150px",
                            marginTop:"-50px",
                            marginLeft:"20px",
                            background:"blue",
                            borderColor:"#808080",
                            color:"white",
                            fontWeight:"bold"
                          }}
                          
                        >
                         Message
                        </button>


                        
                        </>}


                 
  
  
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }else{

    return (
      
      <div className="container">
        <div className="row">
  
          {user &&
            user.length > 0 &&
            user.map((userData) => (
             

              <div className="col-6 mt-5 ml-5" style={{ marginLeft: "350px" }}>
                <div
                  className="card"
                  style={{ width: "50rem",height:"90%", marginLeft: "150xp" }}
                >
                  <div className="card-body" >
                   
                    <p
                      className="card-title mb-5 mt-3"
                      style={{ marginLeft: "10px" }}
                    >
                                  <Badge className="m-2" pill bg="secondary"
               style={{
                  position:"absolute",
                  right:"0%",
                  
               }}
               >
                        {userData.type}
                      </Badge>
                      <a
                        href={userData.Storage_link}
                        style={{ textDecoration: "none",fontSize:"1.4rem" }}
            ><h3>{userData.name} </h3>
                      </a>  
                      <p style={{fontSize:"0.8rem"}}>End Date {userData.end_date}</p>
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
                       {appval&& <button
                          type="button"
                          className="btn  mb-3"
                          
                          onClick={() => detailsApproval(userData.id)}
                          style={{
                            width:"150px",
                            marginTop:"-50px",
                            marginLeft:"20px",
                            background:"red",
                            borderColor:"#808080",
                            color:"white",
                            fontWeight:"bold"
                          }}
                          
                        >
                         Approval
                        </button>}
                        
                        <Badge className="m-2" pill bg="secondary"
             style={{
                position:"absolute",
                right:"0%",
                top:"0"
             }}
             >  
                     {approval=userData.isapproval}
                    </Badge>

                          
                    

                        <button
                          type="button"
                          className="btn  mb-3"
                          
                          onClick={() => message(userData.id,userData.message)}
                          style={{
                            width:"150px",
                            marginTop:"-50px",
                            marginLeft:"20px",
                            background:"blue",
                            borderColor:"#808080",
                            color:"white",
                            fontWeight:"bold"
                          }}
                          
                        >
                         Message
                        </button>
 </>}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );


  }
  };

