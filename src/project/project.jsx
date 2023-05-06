import React, { useState, useEffect } from "react";

import NavbarComp from "../components/NavbarComp";
import swal from "sweetalert";
import axios from "axios";
import { storage } from "../firebase";
import { Outlet, Link } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "react-uuid";

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

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    setPatentInfo(true);
    console.log("santosh", newdata);
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
    alert(downloadURL);
    const userId=localStorage.getItem("userId");
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

    })
  }
          const email= localStorage.getItem("email");
          const role=localStorage.getItem("role");
          const first_name= localStorage.getItem("first_name");
          const last_name= localStorage.getItem("last_name");
          const college= localStorage.getItem("college");
          const picture = localStorage.getItem("picture");
  return (
    
    <div>
      <NavbarComp />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-sm-2">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={picture}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "250px" }}
                />

                <h5 className="my-3">{first_name+" "+last_name}</h5>
                <p className="text-muted mb-1">{role}</p>
                <p className="text-muted mb-4">{college}</p>
                <p className="text-muted mb-4">{email}</p>
                <div className="d-flex justify-content-center mb-2">

                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-10">
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
                <div className="container" style={{ width: "50%" }}>
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
                        />{" "}
                        Public
                        <input
                          type="radio"
                          style={{ marginLeft: "10px" }}
                          onChange={(e) => handle(e)}
                          id="type"
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
    return fetch("http://localhost:8000/project/")
      .then((response) => response.json())
      .then((data) =>{
      data=data.filter((e)=> e.type==="Public")
      setUser(data.reverse())});
  
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="row">
        {user &&
          user.length > 0 &&
          user.map((userData, index) => (
            <div className="col-6 mt-5 ml-5" style={{ marginLeft: "50px" }}>
              <div
                className="card"
                style={{ width: "50rem",height:"80%", marginLeft: "150xp" }}
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
                      {userData.name}
                    </a>
                    <Badge className="m-2" pill bg="secondary">
                      {userData.type}
                    </Badge>
                    <p style={{fontSize:"0.8rem"}}>Updated on {userData.end_date}</p>
                  <p>{userData.description.slice(0, 202)}...</p>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};