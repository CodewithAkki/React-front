import {React,useState,useEffect} from 'react'
import Navbar from '../components/NavbarComp'
import SubNavbar from '../components/subNavbar'
import Dean from '../Dean/dean'
import Badge from "react-bootstrap/Badge";
import Hod from '../Hod/hod'
import Aicte from '../Aicte/aicte'
import '../approval/approval.css'

const Approval = () => {
  const [guid, setguid] = useState(false);
  const [guid1, setguid1] = useState(false);
  const [hod,setHod] = useState(true);
  const [hod1,setHod1] = useState(false);
  const [dean,setDean] = useState(false);
  const [dean1,setDean1] = useState(false);
  const [aict,setAict] = useState(false);
  const [aict1,setAict1] = useState(true);
  const [newBtnShow1,setnewBtnShow1] = useState(false);
  const [newBtnShow, setnewBtnShow] = useState(true);
  const handleGuid = () => {
    setguid(true);
    setguid1(false);

    setDean(true);
    setDean1(false);

    setHod(true);
    setHod1(false);

    setAict(true);
    setAict1(false);


  };
  const handleGuid1 = () => {
    setguid1(true);
    setguid(false);
   
  };

  const handleHod = () => {
    setHod(true);
    setHod1(false);
    setguid(true);
    setguid1(false);

  };
  const handleHod1 = () => {
    setHod1(true);
    setHod(false);
    setguid1(true);
    setguid(false);
    setDean(true);
    setDean1(false);

    setAict(true);
    setAict1(false);

  };

  const handleDean = () => {
    setDean(true);
    setDean1(false);

    setguid(true);
    setguid1(false);



  };
  const handleDean1 = () => {
    setDean1(true);
    setDean(false);
    setHod(true);
    setHod1(false);
    setguid1(true);
    setguid(false);
    setAict(true);
    setAict1(false);
  };

  const handleAict = () => {
    setAict(false);
    setAict1(true);
    setguid(true);
    setguid1(false);
    setHod(true);
    setHod1(false);
    setguid1(true);
    setguid(false);
    setDean(true);
    setDean1(false);
  };
  const handleAict1 = () => {
    setAict1(false);
    setAict(true);
    setguid(true);
    setguid1(false);
  };


    const [projectuser, projectsetUser] = useState([]);
    const ProjectCards = () => {
      const role=localStorage.getItem('role');
      
      if(role==="Guid"){
  
        const userId=localStorage.getItem("userId")
        fetch("http://localhost:8000/project/")
          .then((response) => response.json())
          .then((data) =>{
          data=data.filter((e)=>e.guid===6) 
          projectsetUser(data)});
        
      }else {
        const userId=localStorage.getItem("userId")
        fetch("http://localhost:8000/project/")
          .then((response) => response.json())
          .then((data) =>{
            data=data.filter((e)=>e.leader===userId) 
          console.log(data);
          projectsetUser(data)});
      }
      };
function deleteProject(e){

}
function details(e){

}
  useEffect(() => {
    handleGuid();
    ProjectCards();
  }, []);
console.log("project data: ",projectuser);
return (
    <>
    <Navbar/>
<div className='bar'>
{guid &&  <button
              className='btnguid'
              type="submit"
              onClick={handleGuid1}
              disabled
            >
              Guid
            </button>}
            {guid1 &&  <button
              type="submit"
              className='btnguid'
              onClick={handleGuid}
              
            >
              Guid
            </button>}
            
            {hod && <button
              className='btnguid'
              type="submit"
              onClick={handleHod1}
            >
              Hod
            </button>}
            {hod1 &&  <button
              type="submit"
              className='btnguid'
              onClick={handleHod}
            >
              Hod
            </button>}

            {dean &&<button
              className='btnguid'
              type="submit"
              onClick={handleDean1}
            >
              Dean
            </button>}
            {dean1 &&  <button
              type="submit"
              className='btnguid'
              onClick={handleDean}
            >
              Dean
            </button>}
            {aict1 &&<button
              className='btnguid'
              type="submit"
              onClick={handleAict1}
            >
              AICTE
            </button>}
            {aict &&  <button
              type="submit"
              className='btnguid'
              onClick={handleAict}
            >
              AICTE
            </button>}
</div>
{guid && 
  <div>
     {projectuser &&
          projectuser.length > 0 &&
          projectuser.map((projectdata) => (
<div className="col-6 mt-5 ml-5" style={{ marginLeft: "350px" }}>
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
                      href={projectdata.Storage_link}
                      style={{ textDecoration: "none",fontSize:"1.4rem" }}
          >
             <Badge className="m-2" pill bg="secondary"
             style={{
                position:"absolute",
                right:"0%",
                
             }}
             >
                      {projectdata.type}
                    </Badge>
        

                      <h3>{projectdata.name} </h3>
                    </a>     
                 
                    <p style={{fontSize:"0.8rem"}}>Updated on {projectdata.end_date}</p>
                  <p>{projectdata.description}</p>
                  </p>
                  
                  <button
                        type="button"
                        className="btn  mb-3"
                        
                        onClick={() => details(projectdata.id)}
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
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn  mb-3"
                        onClick={() => deleteProject(projectdata.id)}

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
                        Disapprove
                      </button>
                      </div>
              </div>
            </div>
 ))}

    </div>
}
{hod1 && <Hod/>}
{dean1 && <Dean/>}
{aict1  && <Aicte/>}

    </>
)
}
export default Approval;