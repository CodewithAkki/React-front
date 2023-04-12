import React, { useState, useEffect } from "react";
import Navbar from "./navbar/navbar";
import NavbarComp from '../components/NavbarComp';
import { Outlet, Link } from "react-router-dom";
import AI from "./ai.gif";

const Event = () => {
  const [user, setUser] = useState([]);

  const fetchData = () => {
    return fetch("http://127.0.0.1:8000/Events/")
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <NavbarComp />{" "}
      </div>
      <div className="row">
        {user &&
          user.length > 0 &&
          user.map((userData, index) => (
            <div className="col-md-3 mb-3 mt-5" style={{marginLeft:"100px"}}>
              <div className="card" style={{ width: "25rem" }}>
                <div className="card-body">
                  <div>
                    <img
                      src={userData.event_picture}
                      width="150"
                      height="100"
                    />
                  </div>
                  <h5 className="card-title">{userData.name}</h5>
                  <p className="card-text">{userData.description}</p>
                  <Link href="#" className="btn btn-primary">
                    Go somewhere
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Event;
