import React, { useState } from "react";
import Navbar from "../about/navbar/navbar";
import { storage } from "../firebase";
import NavbarComp from "../components/NavbarComp";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import swal from "sweetalert";
import axios from "axios";
function Project() {
  const picurl = "";
  const [progress, setProgress] = useState(0);
  const url = "http://127.0.0.1:8000/project/";
  const [data, setData] = useState({
    pricePerUnit: "",
    availableQuantity: "",
    projectName: "",
    description: "",
    picture: "",
    endDate:"",
  });

  // const customViewsArray =  [new google.picker.DocsView()]; // custom view
  const uploadfile = (files) => {
    debugger;
    if (!files) return;
    const storageref = ref(Storage, `/files/${files.name}`);
    const uploadTask = uploadBytesResumable(storageref, files);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          [snapshot.bytesTransferred / snapshot.totalBytes] * 100
        );
        alert(progress);
        setProgress(prog);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => (data.pic = url));
      }
    );
  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log("santosh", newdata);
  }

  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        name: data.projectName,
        pricePerUnit: data.pricePerUnit,
        availableQuantity: data.availableQuantity,
        projectName: data.projectName,
        description: data.description,
        picture: data.pic,
        end_date:data.endDate
      })
      .then((res) => {
        if (res.data.message === "project created") {
          swal({
            title: "Good job!",
            text: "you created project successfully!",
            icon: "success",
            button: "ok",
          });
        } else if (res.data.message === "project fail to create") {
          {
            swal({
              title: "try again",
              text: "fail to created project",
              icon: "error",
              button: "ok",
            });
          }
        }
      });
  }
  const handleShow = () => {
    setShow(true);
  };
  const [show, setShow] = useState(false);
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
              width:"10%",
              float:"right",
              position:"relative",
              marginTop:"0px",
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
                          placeholder="projectName"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          onChange={(e) => handle(e)}
                          id="availableQuantity"
                          value={data.availableQuantity}
                          placeholder="availableQuantity"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          onChange={(e) => handle(e)}
                          id="pricePerUnit"
                          value={data.pricePerUnit}
                          placeholder="pricePerUnit"
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
                        <input
                          type="file"
                          id="projectName"
                          placeholder="projectName"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            uploadfile(event.target.files[0]);
                          }}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        {" "}
                        Click and Upload
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
