import {React,useState,useEffect} from 'react'
import Navbar from '../components/NavbarComp'
import SubNavbar from '../components/subNavbar'
import swal from "sweetalert";
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

  const [conhod,setconhod]=useState(false);
  const [projecthod, projectsethod] = useState([]);

  const [condean,setcondean]=useState(false);
  const [projectdean, projectsetdean] = useState([]);

  const [conaict,setconaict]=useState(false);
  const [projectaict, projectsetaict] = useState([]);

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

    ///////start hod display
    const role=localStorage.getItem('role');
      
    if(role==="Hod"){
      setconhod(true);
      const userId=localStorage.getItem("userId")
      fetch("http://localhost:8000/project/")
        .then((response) => response.json())
        .then((data) =>{
        data=data.filter((e)=>e.hod==userId)
        projectsethod(data)});
        
    }else {
      const userId=localStorage.getItem("userId")
      fetch("http://localhost:8000/project/")
        .then((response) => response.json())
        .then((data) =>{
          data=data.filter((e)=>e.hod!=null)
        console.log(data);
        projectsethod(data)});
       
    }
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

        ///////start dean display
        const role=localStorage.getItem('role');
      
        if(role==="Dean"){
          setcondean(true);
          const userId=localStorage.getItem("userId")
          fetch("http://localhost:8000/project/")
            .then((response) => response.json())
            .then((data) =>{
            data=data.filter((e)=>e.dean==userId)
            projectsetdean(data)});
            
        }else {
          
          const userId=localStorage.getItem("userId")
          fetch("http://localhost:8000/project/")
            .then((response) => response.json())
            .then((data) =>{
             data=data.filter((e)=>e.dean!=null )
            console.log(data);
            projectsetdean(data)});
            
        }
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

            ///////start dean display
            const role=localStorage.getItem('role');
      
            if(role==="Aicte member"){
              setcondean(true);
              const userId=localStorage.getItem("userId")
              fetch("http://localhost:8000/project/")
                .then((response) => response.json())
                .then((data) =>{
                data=data.filter((e)=>e.aicte==userId)
                projectsetaict(data)});
                
            }else {
              
              const userId=localStorage.getItem("userId")
              fetch("http://localhost:8000/project/")
                .then((response) => response.json())
                .then((data) =>{
                 data=data.filter((e)=>e.aicte!=null)
                console.log(data);
                projectsetaict(data)});
                
            }


  };
  const handleAict1 = () => {
    setAict1(false);
    setAict(true);
    setguid(true);
    setguid1(false);
  };
  const college =localStorage.getItem("college");
  const approveAicte=(e)=>{

  }
  const disapprovedaict=(e)=>{

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/project/deantoaicte/"+college+"/"+e, requestOptions)
      .then(response => response.text())
      .then((result)=>{ 
        swal({
          title: "Disapproved!",
          text: "Project has been Disapproved!",
          icon: "success",
          button: "ok",
        });
      
      })
      .catch(error => console.log('error', error));



  }
    const approveDean=(e)=>{

      fetch("http://localhost:8000/project/deantoaicte/"+college+"/"+e)
  .then(response => response.text())
  .then((result)=>{ 
    swal({
      title: "Approved!",
      text: "Project has been Approved!",
      icon: "success",
      button: "ok",
    });
  
  })
  .catch(error => console.log('error', error));



    }
    const disapprovedDean=(e)=>{

      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://localhost:8000/project/hodtodean/"+college+"/"+e, requestOptions)
        .then(response => response.text())
        .then((result)=>{ 
          swal({
            title: "Disapproved!",
            text: "Project has been Disapproved!",
            icon: "success",
            button: "ok",
          });
        
        })
        .catch(error => console.log('error', error));



    }

    const approveHod=(e)=>{

      fetch("http://localhost:8000/project/hodtodean/"+college+"/"+e)
  .then(response => response.text())
  .then((result)=>{ 
    swal({
      title: "Approved!",
      text: "Project has been Approved!",
      icon: "success",
      button: "ok",
    });
  
  })
  .catch(error => console.log('error', error));

    }

    const disapprovedHod=(e)=>{

      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://localhost:8000/project/guidtohod/"+college+"/"+e, requestOptions)
        .then(response => response.text())
        .then((result)=>{ 
          swal({
            title: "Disapproved!",
            text: "Project has been Disapproved!",
            icon: "success",
            button: "ok",
          });
        
        })
        .catch(error => console.log('error', error));



    }

    const approveGuid=(e)=>{

      fetch("http://localhost:8000/project/guidtohod/"+college+"/"+e)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  swal({
    title: "Approved!",
    text: "Project has been Approved!",
    icon: "success",
    button: "ok",
  });
    }


    const [con,setcon]=useState(false);
    const [projectuser, projectsetUser] = useState([]);
    const ProjectCards = () => {
      const role=localStorage.getItem('role');
      
      if(role==="Guid"){
        setcon(true);
        const userId=localStorage.getItem("userId")
        fetch("http://localhost:8000/project/")
          .then((response) => response.json())
          .then((data) =>{
          data=data.filter((e)=>e.guid==userId) 
          projectsetUser(data)});
          
      }else {
        const userId=localStorage.getItem("userId")
        fetch("http://localhost:8000/project/")
          .then((response) => response.json())
          .then((data) =>{
            data=data.filter((e)=>e.guid!=null) 
          console.log(data);
          projectsetUser(data)});

      }
      
      };
function deleteProject(e){

}
function details(e){

  console.log(e);

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
              ><Badge className="m-2" pill bg="secondary" style={{
                height:"50px",
                fontSize:"2em",

              }}>Guid</Badge>
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
                  
                 {con&& <div><button
                        type="button"
                        className="btn  mb-3"
                        
                        onClick={() => approveGuid(projectdata.id)}
                        style={{
                          width:"150px",
                          marginTop:"-50px",
                          marginLeft:"0px",
                          background:"green",
                          borderColor:"green",
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
                      }
                      <button
                        type="button"
                        className="btn  mb-3"
                        onClick={() => deleteProject(projectdata.id)}

                        style={{
                          width:"150px",
                          marginTop:"-100px",
                          marginLeft:"350px",
                          background:"#808080",
                          borderColor:"#808080",
                          color:"white",
                          fontWeight:"bold"
                        }}
                       
                      >
                        Message
                      </button>
                      </div>
              </div>
            </div>
 ))}

    </div>
}
{hod1 && 
  <div>
     {projecthod &&
          projecthod.length > 0 &&
          projecthod.map((projectdata) => (
<div className="col-6 mt-5 ml-5" style={{ marginLeft: "350px" }}>

              <div
                className="card"
                style={{ width: "50rem",height:"80%", marginLeft: "150xp" }}
              ><Badge className="m-2" pill bg="secondary" style={{
                height:"50px",
                fontSize:"2em",

              }}>HOD</Badge>
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
                  
                 {conhod&& <div><button
                        type="button"
                        className="btn  mb-3"
                        
                        onClick={() => approveHod(projectdata.id)}
                        style={{
                          width:"150px",
                          marginTop:"-50px",
                          marginLeft:"0px",
                          background:"green",
                          borderColor:"green",
                          color:"white",
                          fontWeight:"bold"
                        }}
                        
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn  mb-3"
                        onClick={() => disapprovedHod(projectdata.id)}

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
                      }
                      <button
                        type="button"
                        className="btn  mb-3"
                        onClick={() => deleteProject(projectdata.id)}
                        onDoubleClick
                        style={{
                          width:"150px",
                          marginTop:"-100px",
                          marginLeft:"350px",
                          background:"#808080",
                          borderColor:"#808080",
                          color:"white",
                          fontWeight:"bold"
                        }}
                       
                      >
                        Message
                      </button>
                      </div>
              </div>
            </div>
 ))}

    </div>
}
{dean1 && 

<div>
{projectdean &&
     projectdean.length > 0 &&
     projectdean.map((projectdata) => (
<div className="col-6 mt-5 ml-5" style={{ marginLeft: "350px" }}>

         <div
           className="card"
           style={{ width: "50rem",height:"80%", marginLeft: "150xp" }}
         ><Badge className="m-2" pill bg="secondary" style={{
           height:"50px",
           fontSize:"2em",

         }}>DEAN</Badge>
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
             
            {condean&& <div><button
                   type="button"
                   className="btn  mb-3"
                   
                   onClick={() => approveDean(projectdata.id)}
                   style={{
                     width:"150px",
                     marginTop:"-50px",
                     marginLeft:"0px",
                     background:"green",
                     borderColor:"green",
                     color:"white",
                     fontWeight:"bold"
                   }}
                   
                 >
                   Approve
                 </button>
                 <button
                   type="button"
                   className="btn  mb-3"
                   onClick={() => disapprovedDean(projectdata.id)}

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
                 }
                 <button
                   type="button"
                   className="btn  mb-3"
                   onClick={() => deleteProject(projectdata.id)}

                   style={{
                     width:"150px",
                     marginTop:"-100px",
                     marginLeft:"350px",
                     background:"#808080",
                     borderColor:"#808080",
                     color:"white",
                     fontWeight:"bold"
                   }}
                  
                 >
                   Message
                 </button>
                 </div>
         </div>
       </div>
))}

</div>

}
{aict1 && 

<div>
{projectaict &&
     projectaict.length > 0 &&
     projectaict.map((projectdata) => (
<div className="col-6 mt-5 ml-5" style={{ marginLeft: "350px" }}>

         <div
           className="card"
           style={{ width: "50rem",height:"80%", marginLeft: "150xp" }}
         ><Badge className="m-2" pill bg="secondary" style={{
           height:"50px",
           fontSize:"2em",

         }}>DEAN</Badge>
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
             
            {conaict&& <div><button
                   type="button"
                   className="btn  mb-3"
                   
                   onClick={() => approveAicte(projectdata.id)}
                   style={{
                     width:"150px",
                     marginTop:"-50px",
                     marginLeft:"0px",
                     background:"green",
                     borderColor:"green",
                     color:"white",
                     fontWeight:"bold"
                   }}
                   
                 >
                   Approve
                 </button>
                 <button
                   type="button"
                   className="btn  mb-3"
                   onClick={() => disapprovedaict(projectdata.id)}

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
                 }
                 <button
                   type="button"
                   className="btn  mb-3"
                   onClick={() => deleteProject(projectdata.id)}

                   style={{
                     width:"150px",
                     marginTop:"-100px",
                     marginLeft:"350px",
                     background:"#808080",
                     borderColor:"#808080",
                     color:"white",
                     fontWeight:"bold"
                   }}
                  
                 >
                   Message
                 </button>
                 </div>
         </div>
       </div>
))}

</div>

}

    </>
)
}
export default Approval;