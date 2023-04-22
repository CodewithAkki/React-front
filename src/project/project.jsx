import React, { useState ,useEffect} from "react";
import Navbar from "../about/navbar/navbar";
import NavbarComp from "../components/NavbarComp";
import swal from "sweetalert";
import axios from "axios";
import {storage} from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import uuid from 'react-uuid';

function Project() {
  const picurl = "";
  const [progress, setProgress] = useState(0);
  const [patentInfo,setPatentInfo]=useState(false);
  const url = "http://127.0.0.1:8000/project/";
  const [data, setData] = useState({
    projectName: "",
    description: "",
    endDate: "",
    domain:"",
    type:"",
    patent:"true",
    Patent_Info:"",
  });
  const [imageUpload,setImageUpload]=useState(null)
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  // const customViewsArray =  [new google.picker.DocsView()]; // custom view
  const uploadfile = (files) => {
    if (imageUpload==null) return;
    const imageRef = ref(storage,`images/${imageUpload.name+uuid()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    uploadTask.on("state_changed",
    (snapshot) => {
      const progress =
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgresspercent(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL);
        
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

  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        name: data.projectName,
        end_date: data.endDate,
        type:data.type,
        description: data.description,
        Storage_link:imgUrl,
        domain:data.domain,
        is_patent:data.patent,
        patent_info:data.Patent_Info,    
      })
      .then((res) => {
          swal({
            title: "Good job!",
            text: "you created project successfully!",
            icon: "success",
            button: "ok",
          });
      
      });
  }
  const handleShow = () => {
    setShow(true);
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
  return (
    <div>
      <NavbarComp />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-sm-2">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">John Smith</h5>
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">
                    Follow
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-10">
            <button
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
            </button>
            <div className="back">
              {/* <firebase /> */}
              {show && (
                <div className="container" style={{ width: "50%" }}>
                  <h3 className="mb-5">Project</h3>
                  <form onSubmit={(e) => submit(e)}>
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
                        /> is Patent
                      </div>
                    { patentInfo &&<div className="form-outline mb-4">
                        <input
                          type="text"
                          onChange={(e) => handle(e)}
                          id="Patent_Info"
                          value={data.Patent_Info}
                          placeholder="Patent Info"
                          className="form-control form-control-lg"
                        />
                      </div>}
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
                        onChange={(e)=>handle(e)} 
                        id="domain">
                          <option selected>Select option</option>
                          {user && user.map((data)=>
                            <option value={data.id}>{data.name}</option>)}
                        </select>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="radio"
                          onChange={(e) => handle(e)}
                          id="type"
                          value="Public"
                        /> Public
                      <input
                          type="radio"
                          style={{marginLeft:"10px"}}
                          onChange={(e) => handle(e)}
                          id="type"
                          value="Private"
                        /> Private
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
                      <button type="submit" className="btn btn-primary" onClick={ uploadfile}>
                      
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
