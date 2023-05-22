import axios from "axios";
import React, { useState , useEffect } from "react";
import swal from "sweetalert";
import "./signup.css";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
function Support() {
  const url = "http://127.0.0.1:8000/users/";
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    college:"",
    contact_no: "",
    password: "",
    role:"",
    address:"",
    department:"",
    university:""
  });
  console.log(data)
const [college,setcollege]=useState([]);
  const fetchCollege=()=>{
 return fetch("http://localhost:8000/users/college/")
        .then((response) => response.json())
        .then((data) =>{
        console.log(data);
        setcollege(data)});//.reverse())});
    
    
  }
  const [university,setUniversity]=useState([]);
  const fetchUniversity=()=>{
    return fetch("http://localhost:8000/users/university/")
    .then((response) => response.json())
    .then((data) =>{
    console.log(data);
    setUniversity(data)});
  }

  //console.log(university);

  useEffect(() => {
    fetchCollege();
    fetchUniversity();
  }, []);



const navigate = useNavigate();
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  const [value, setValue] = useState();


  const [imageUpload, setImageUpload] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  let imgUrl_ ;
  const collegeName=(e)=>{
    console.log(e.target.value);
  }
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



  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  function submit(downloadURL) {
   
    axios
      .post(url, {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        college:data.college,
        department:data.department,
        phone_no: data.contact_no,
        role: value,
        address:data.address,
        department:data.department,
        university:data.university,
        profilePic:downloadURL
      })
      .then((res) => {
        console.log(res.status);
        if (res.data.message === "user registered sccessfully") {
          console.log("santosh");
          swal({
            title: "Good job!",
            text: "you are registered successfully!",
            icon: "success",
            button: "ok",
          });
          navigate("/login");
        }else
        {
          swal({
            title: "try again",
            text: "fail to register",
            icon: "error",
            button: "ok",
          });
        }
      });
  }
  return (
    <div>
      <div>
        {/* Section: Design Block */}
        <section>
          {/* Jumbotron */}
          <div
            className="px-4 py-5 px-md-5 text-center text-lg-start"
            style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
          >
            <div className="container">
              <div className="row gx-lg-5 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <h1 className="my-5 display-3 fw-bold ls-tight">
                    Best way to test your <br />
                    <span className="text-primary">
                      knowledge is from compition
                    </span>
                  </h1>
                  <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                    This is an online plateform for all compitative project to
                    store participate and get exciting prices that value your
                    profile be the great be the best register now
                  </p>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="card">
                    <div className="card-body py-5 px-md-5">
                      <form onSubmit={(e) => submit(e)}>
                        {/* 2 column grid layout with text inputs for the first and last names */}
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                onChange={(e) => handle(e)}
                                id="first_name"
                                value={data.first_name}
                                placeholder="First name"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                onChange={(e) => handle(e)}
                                value={data.last_name}
                                id="last_name"
                                placeholder="Last name"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Email input */}
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            onChange={(e) => handle(e)}
                            value={data.email}
                            id="email"
                            placeholder="Email address"
                            className="form-control"
                          />
                        </div>
                        <div className="form-outline mb-4">
                         <select
             
             //value={}
             className="form-control form-control-lg"
             onChange={(e) => {
              console.log(e.target.value);
              const value=e.target.value;
              setData({...data,college:value})
            }}
             id="domain"

             
           >
               <option selected>Select College</option>
             
             {college &&
               college.map((data) => (
                 
                 <option value={data.code}>{data.collegeName}</option>
               ))}
           </select>
                        </div>
                        <div className="form-outline mb-4">
                       {/** university */}
                       <select
             
             //value={}
             className="form-control form-control-lg"
             onChange={(e) => {
              console.log(e.target.value);
              const value=e.target.value;
              setData({...data,university:value})
            }}
             id="domain"

             
           >
               <option selected>Select University</option>
             
             {university &&
               university.map((data) => (
                 
                 <option value={data.id}>{data.UniversityName}</option>
               ))}
           </select>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            onChange={(e) => handle(e)}
                            value={data.contact_no}
                            id="contact_no"
                            placeholder="Phone no"
                            className="form-control"
                          />
                        </div>
                        {/* Password input */}
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            onChange={(e) => handle(e)}
                            value={data.password}
                            id="password"
                            placeholder="Password"
                            className="form-control"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            onChange={(e) => handle(e)}
                            value={data.department.toUpperCase()}
                            id="department"
                            placeholder="Department"
                            className="form-control"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            onChange={(e) => handle(e)}
                            value={data.address}
                            id="address"
                            placeholder="state"
                            className="form-control"
                          />
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
                          accept="image/x-png,image/gif,image/jpeg" 
                        />
                      </div>

                         {/* Select */}
                         <div className="form-ouline mb-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handleChange}
                            id="option"
                            value={data.option}
                          >
                             <option selected>Select option</option>
                            <option value="1">Student</option>
                            <option value="2">Guide</option>
                            <option value="3">HOD</option>
                            <option value='4'>Dean</option>
                          
                          </select>
                        </div>
                        {/* Checkbox */}

                       
                        {/* Submit button */}
                        <button
                          type="button"
                          className="btn btn-primary btn-block mb-5 w-10"
                          onClick={uploadfile}
                        >
                          Sign up
                        </button>
                        {/* Register buttons */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Jumbotron */}
        </section>
        {/* Section: Design Block */}
      </div>
    </div>
  );
}

export default Support;
