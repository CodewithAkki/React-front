import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import "./signup.css";

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
    is_AICTEmember:"false",
    is_dean:"false",
    is_guid:"true",
    is_hod:"false",
    is_teacher:"false",
  });
const navigate = useNavigate();
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        contact_no: data.contact_no,
        is_AICTEmember:data.is_AICTEmember,
        is_dean:data.is_dean,
        is_guid:data.is_guid,
        is_hod:data.is_hod,
        is_teacher:data.is_teacher,
      })
      .then((res) => {
        if (res.data.message === "user registered sccessfully") {
          console.log("santosh");
          swal({
            title: "Good job!",
            text: "you are registered successfully!",
            icon: "success",
            button: "ok",
          });
            navigate("/login");
        }
        if (res.data.message === "fail to register") {
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
                          <input
                            type="text"
                            onChange={(e) => handle(e)}
                            value={data.college}
                            id="college"
                            placeholder="College name"
                            className="form-control"
                          />
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
                         {/* Select */}
                         <div className="form-ouline mb-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => handle(e)}
                            id="option"
                            value={data.option}
                          >
                            {/* <option selected>Select option</option>
                            <option value="true">Student</option>
                            <option value="true">Guide</option>
                            <option value="true">HOD</option>
                            <option value="true">Dean</option>
                            <option value="true">AICTE</option> */}
                          </select>
                        </div>
                        {/* Checkbox */}
                        <div className="form-check d-flex justify-content-center mb-4">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            defaultValue
                            id="form2Example33"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example33"
                          >
                            Subscribe to our newsletter
                          </label>
                        </div>
                       
                        {/* Submit button */}
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-5 w-10"
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
