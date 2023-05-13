import {React,useState,useEffect }from 'react'
import Badge from "react-bootstrap/Badge";

 function Guid() {
  const [user, setUser] = useState([]);
  const ProjectCard = () => {
    const role=localStorage.getItem('role');
    const userId=localStorage.getItem("userId")
    if(role===2){


      fetch("http://localhost:8000/project/")
        .then((response) => response.json())
        .then((data) =>{
          data=data.filter((e)=>e.guid===userId) 
        console.log(data);
        setUser(data)});
      
    }else {
      
      fetch("http://localhost:8000/project/")
        .then((response) => response.json())
        .then((data) =>{
          data=data.filter((e)=>e.leader===userId) 
        console.log(data);
        setUser(data)});
    }
    };



    useEffect(() => {
      ProjectCard();
    
    }, []);

  return (
    <div>
<div class="card" style={{
    width:"90%",
    marginLeft:"60px",
    marginTop:"20px"
  }}>
  <div class="card-body" >
    This is some text within a card body.
  </div>
</div>
    </div>
  )
}
export default Guid;