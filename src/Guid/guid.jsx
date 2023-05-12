import {React,useState,useEffect }from 'react'

 function Guid() {
  const ProjectCard = () => {
    const role=localStorage.getItem('role');
    const id=localStorage.getItem('userId')
    const [user, setUser] = useState([]);
    if(role===2){


      const userId=localStorage.getItem("userId")
      fetch("http://localhost:8000/project/")
        .then((response) => response.json())
        .then((data) =>{
          data=data.filter((e)=>e.guid===id) 
        console.log(data);
        setUser(data)});
      
    }else {
      const userId=localStorage.getItem("userId")
      fetch("http://localhost:8000/project/")
        .then((response) => response.json())
        .then((data) =>{
          data=data.filter((e)=>e.leader===id) 
        console.log(data);
        setUser(data)});
    }
    };

    useEffect(() => {
      ProjectCard();
    
    }, []);

  return (
    <div>
    <div className="row">

    {user &&
          user.length > 0 &&
          user.map((userData) => (
    
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
          

        </div>
      </div>
   </div>))}
   </div>
    </div>
  )
}
export default Guid;