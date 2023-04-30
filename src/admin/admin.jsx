import React, { Component ,useEffect ,useState } from 'react'
import { DropdownButton, Dropdown } from "react-bootstrap";
import Navbar from '../components/NavbarComp'
import './admin.css'
import swal from "sweetalert";
import axios from "axios";
function Admin(){
   
    const [data, setData] = useState({
        id: "",
        name: "",
        is_patent: "",
        patent_info: "",
        start_date: "",
        end_date: "",
        Storage_link: "",
        type: "",
        description: "",
        domain: ""
      });

      const [role, setrole] = useState({
        id: "",
        first_name: "",
        last_name: "",
        college: "",
        department: "",
        designation: "",
        phone_no: "",
        address: "",
        birthdate: "",
        email: "",
        password: "",
        role: "",
        profilePic: ""
      });

    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
      }

    const [user, setUser] = useState([]);
    const fetchData = () => {
        return fetch("http://localhost:8000/project/")
          .then((response) => response.json())
          .then((data) => setUser(data));
    };

    const [Teacher, setTeacher] = useState([]);
    const fetchData_Teacher = () => {
        return fetch("http://localhost:8000/users/Teacher")
          .then((response) => response.json())
          .then((data) => setTeacher(data));
    };

    const [Guid, setGuid] = useState([]);

    const fetchData_Guid = () => {
        return fetch("http://localhost:8000/users/Guid")
          .then((response) => response.json())
          .then((data) => setGuid(data));
    };
    
    const [Hod, setHod] = useState([]);
    const fetchData_Hod = () => {
        return fetch("http://localhost:8000/users/Hod")
          .then((response) => response.json())
          .then((data) => setHod(data));
    };

    const [Dean, setDean] = useState([]);
    const fetchData_Dean = () => {
        return fetch("http://localhost:8000/users/Dean")
          .then((response) => response.json())
          .then((data) => setDean(data));
    };

    const [Aicte, setAicte] = useState([]);
    const fetchData_Aicte = () => {
        return fetch("http://localhost:8000/users/Aicte member")
          .then((response) => response.json())
          .then((data) => setAicte(data));
    };

    useEffect(() => {
        fetchData();
        fetchData_Teacher();
        fetchData_Guid();
        fetchData_Hod();
        fetchData_Dean();
        fetchData_Aicte();
      }, []);
      const [Teachers, setTeachers] = useState();
      const [Projects, setProjects] = useState();
      const [Guids, setGuids] = useState();
      const [Hods, setHods] = useState();
      const [Deans, setDeans] = useState();
      const [Aictes, setAictes] = useState();

      const handleSelect_project=(e)=>{
        setProjects(e);
        console.log(e);
      }
      const handleSelect_teacher=(e)=>{
        setTeachers(e);console.log(e);
      }
      const handleSelect_guid=(e)=>{
        setGuids(e);console.log(e);
      }
      const handleSelect_Hod=(e)=>{
        setHods(e);console.log(e);
      }
      const handleSelect_Dean=(e)=>{
        setDeans(e);console.log(e);
      }
      const handleSelect_Aicte=(e)=>{
        setAictes(e);console.log(e);
      }
      const url_assignment ="http://localhost:8000/project/Assignment";
      const submit=()=>{
        console.log(
           { guid: Guids,
            teacher: Teachers,
            hod: Hods,
            dean: Deans,
            AicteMember: Aictes,
            project: Projects
        }
        );
        if(Guids!=undefined || Teachers!=undefined || Hods!=undefined || Deans!=undefined || Aictes!=undefined || Projects!=undefined){
        axios
        .post(url_assignment, {
            
            
                guid: Guids,
                teacher: Teachers,
                hod: Hods,
                dean: Deans,
                AicteMember: Aictes,
                project: Projects
              
              
        }).then((res) => {

        
          swal({
            title: "Good job!",
            text: "Assigned project successfully!",
            icon: "success",
            button: "ok",
          });
    
        })
      }else{
        swal({
          title: "fail!",
          text: "Fail to assign the project !",
          icon: "error",
          button: "ok",
        });
      }
      }

    return (

    <>
    <Navbar/>

      <h1 className='title'>Project Assignment</h1>
    <DropdownButton id="split-button-dropdown" title="Select Project"
    onSelect={handleSelect_project}
    >
         {user.map((data) => (

    
        <Dropdown.Item eventKey={data.id}>{data.name}</Dropdown.Item>
    

      ))}
      </DropdownButton>


      <DropdownButton id="split-button-dropdown" title="Select Teacher"
      onSelect={handleSelect_teacher}
      >
         {Teacher.map((role) => (

    
        <Dropdown.Item eventKey={role.id}>{role.first_name+" "+role.last_name}</Dropdown.Item>
    

      ))}
      </DropdownButton>

      <DropdownButton id="split-button-dropdown" title="Select Guid"
      onSelect={handleSelect_guid}
      >
         {Guid.map((role) => (

    
        <Dropdown.Item eventKey={role.id}>{role.first_name+" "+role.last_name}</Dropdown.Item>
    

      ))}
      </DropdownButton>

      <DropdownButton id="split-button-dropdown" title="Select Hod"
      onSelect={handleSelect_Hod}
      >
         {Hod.map((role) => (

        <Dropdown.Item eventKey={role.id}>{role.first_name+" "+role.last_name}</Dropdown.Item>
    

      ))}
      </DropdownButton>

      <DropdownButton id="split-button-dropdown" title="Select Dean"
      onSelect={handleSelect_Dean}
      >
         {Dean.map((role) => (
        <Dropdown.Item eventKey={role.id}>{role.first_name+" "+role.last_name}</Dropdown.Item>
      ))}
      </DropdownButton>

      <DropdownButton id="split-button-dropdown" title="Select AICTE Member"
      onSelect={handleSelect_Aicte}
      >
         {Aicte.map((role) => (
        <Dropdown.Item eventKey={role.id}>{role.first_name+" "+role.last_name}</Dropdown.Item>
      ))}
      </DropdownButton>
       
      <button
                        type="button"
                        className="btnsubmit btn-primary "
                        onClick={submit}
                      >
                        Submit
                      </button>
      </>
    )
  
}

export default Admin