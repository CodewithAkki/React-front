import {React,useState,useEffect} from 'react'
import NavbarComp from '../components/NavbarComp';

import swal from "sweetalert";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";
import '../approval/approval.css'
const Approval = () => {

  const [data, setData] = useState({
    id:"",
    name: "",
    is_patent: "",
    patent_info: "",
    start_date: "",
    end_date: "",
    Storage_link: "true",
    type: "",
    description: "",
    domain: ""
  });


  const [data_approval, setData_approval] = useState({
    is_approved_guid: "",
    is_aicte_approved: "",
    is_hod_approved: "",
    is_dean_approved: "",
    description_guid: "",
    description_hod: "",
    description_dean: "",
    description_aicte: "",
    project: ""
  });

  
  const [collect_projects,setProjects]=useState();
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("userId");
  const handleSelect_project=(e)=>{
    setProjects(e);
    console.log(e); 
  }

  useEffect(() => {
    fetchData();
    fetchData_approve();
  }, []);

  const [Teacher_message, Teacher_setMessage] = useState('');
  const [Guid_message, Guid_setMessage] = useState('');
  const [Hod_message, Hod_setMessage] = useState('');
  const [dean_message, dean_setMessage] = useState('');
  const [AICTE_Member_message, AICTE_Member_setMessage] = useState('');


  const [Teacher_radio, Teacher_setradio] = useState('');
  const [Guid_radio, Guid_setradio] = useState('');
  const [Hod_radio, Hod_setradio] = useState('');
  const [dean_radio, dean_setradio] = useState('');
  const [AICTE_Member_radio, AICTE_Member_setradio] = useState('');

  const handleChange_radio = event => {
    Teacher_setradio(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChange1_radio = event => {
    Guid_setradio(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChange2_radio = event => {
    Hod_setradio(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChange3_radio = event => {
    dean_setradio(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChange4_radio = event => {
    AICTE_Member_setradio(event.target.value);

    console.log('value is:', event.target.value);
  };


  const handleChange = event => {
    Teacher_setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChange1 = event => {
    Guid_setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChange2 = event => {
    Hod_setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChange3 = event => {
    dean_setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChange4 = event => {
    AICTE_Member_setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  function submit(){
    const url ="http://localhost:8000/project/Approve/"
      console.log(Teacher_message);
      axios
      .post(url, {
        is_teacher_approved:Teacher_radio,
        description_teacher: Teacher_message,
        project: collect_projects
      }).then((res) => {
  
      if(res.status==200){
        swal({
          title: "Good job!",
          text: "you created project successfully!",
          icon: "success",
          button: "ok",
        });
      }else{
        swal({
          title: "fail!",
          text: "fail to approve",
          icon: "success",
          button: "ok",
        });
      }
      })
  }
  function submit1(){
    const url ="http://localhost:8000/project/Approve/"+collect_projects+"/"
    console.log(Guid_message);
    axios
    .patch(url, {
      is_approved_guid: Guid_radio,
      description_guid: Guid_message,
      project: collect_projects
    }).then((res) => {

    if(res.status==200){
      swal({
        title: "Good job!",
        text: "you created project successfully!",
        icon: "success",
        button: "ok",
      });
    }else{
      swal({
        title: "fail!",
        text: "fail to approve",
        icon: "success",
        button: "ok",
      });
    }
    })
  }
  function submit2(){
    console.log(Hod_message);
    const url ="http://localhost:8000/project/Approve/"+collect_projects+"/"
    
    axios
    .patch(url, {
      is_hod_approved: Hod_radio,
      description_hod: Hod_message,
      project: collect_projects
    }).then((res) => {

    if(res.status==200){
      swal({
        title: "Good job!",
        text: "you created project successfully!",
        icon: "success",
        button: "ok",
      });
    }else{
      swal({
        title: "fail!",
        text: "fail to approve",
        icon: "success",
        button: "ok",
      });
    }
    })
  }
  function submit3(){
    console.log(dean_message);
    const url ="http://localhost:8000/project/Approve/"+collect_projects+"/"
    
    axios
    .patch(url, {
      is_dean_approved: dean_radio,
      description_dean: dean_message,
      project: collect_projects
    }).then((res) => {

    if(res.status==200){
      swal({
        title: "Good job!",
        text: "you created project successfully!",
        icon: "success",
        button: "ok",
      });
    }else{
      swal({
        title: "fail!",
        text: "fail to approve",
        icon: "success",
        button: "ok",
      });
    }
    })
  }
  function submit4(){
    console.log(AICTE_Member_message);
    const url ="http://localhost:8000/project/Approve/"+collect_projects+"/"
    
    axios
    .patch(url, {
      is_aicte_approved: AICTE_Member_radio,
      description_aicte: AICTE_Member_message,
      project: collect_projects
    }).then((res) => {

    if(res.status==200){
      swal({
        title: "Good job!",
        text: "you created project successfully!",
        icon: "success",
        button: "ok",
      });
    }else{
      swal({
        title: "fail!",
        text: "fail to approve",
        icon: "success",
        button: "ok",
      });
    }
    })
  }

  const [projectdata, setprojectdata] = useState([]);

  const fetchData = () => {
    return fetch("http://localhost:8000/project/Assigned/"+role+'/'+id)
      .then((response) => response.json())
      .then((data) => setprojectdata(data));
  };

  const [approval, setapproval] = useState([]);

  const fetchData_approve = () => {
    return fetch("http://localhost:8000/project/Approve/"+collect_projects+"/")
      .then((response) => response.json())
      .then((data) => setapproval(data));
  };
console.log(collect_projects);
  return (
    <>
    <NavbarComp/>
    <div>

    <DropdownButton id="split-button-dropdown" title="Select Project"
      onSelect={handleSelect_project}
      >
         {projectdata.map((data) => (

        <Dropdown.Item eventKey={data.id}>{data.name}</Dropdown.Item>
    

      ))}
      </DropdownButton>
{/*approval*/}
    </div>


    <div  style={{display:"flex",margin:"120px"}}>
    <div className="card" style={{width: "18rem"}}>
  <img className="card-img-top" src="download.jfif" alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">Teacher</h5>
    <label>
    

    { //Check if message failed
      
        (role === 'Teacher')
          ?<input type="radio" value="true" name="approve_teacher"  onChange={handleChange_radio}/>
          :<input type="radio" value="true" name="approve_teacher"  onChange={handleChange_radio} disabled/> 
        
    }
  
    &nbsp; Approval
    </label>
    
    { //Check if message failed
      
        (role === 'Teacher')
           
          ? <input type="textArea" className='card-text'  onChange={handleChange}/>
          :<input type="textArea" className='card-text'  onChange={handleChange} disabled />
         
      }
    <div>
    { //Check if message failed
        (role === 'Teacher')
          ?<button className="btn btn-primary" onClick={submit}>Go somewhere</button>
          :<button className="btn btn-primary" disabled>Go somewhere</button>
    }
 
    </div>
  </div>
</div>

<div className="card" style={{width: "18rem",marginLeft:"30px"}}>
  <img className="card-img-top" src="download.jfif" alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">Guid</h5>

    <label>
    
    { //Check if message failed
     
        (role === 'Guid')
          ?<input type="radio" value="true" name="approve_teacher"  onChange={handleChange1_radio}/>
          :<input type="radio" value="true" name="approve_teacher" data_approval={data_approval.is_approved_guid} onChange={handleChange1_radio} disabled/> 
          
    }
    &nbsp; Approval
    </label>

    { //Check if message failed
      
        (role === 'Guid')
          ? <input type="textArea" className='card-text'   onChange={handleChange1}/> 
          :<input type="textArea" className='card-text' value={data_approval.description_guid} onChange={handleChange1} disabled />
        
    }

    <div>
    { //Check if message failed
        (role === 'Guid')
          ?<button className="btn btn-primary" onClick={submit}>Go somewhere</button>
          :<button className="btn btn-primary" disabled>Go somewhere</button>
    }
    </div>
  </div>
</div>

<div className="card" style={{width: "18rem",marginLeft:"30px"}}>
  <img className="card-img-top" src="download.jfif" alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">HOD</h5>
    <label>
    
    { //Check if message failed
     
        (role === 'Hod')
          ?<input type="radio" value="true" name="approve_teacher" onChange={handleChange2_radio} />
          :<input type="radio" value="true" name="approve_teacher" onChange={handleChange2_radio} disabled/> 
    
    }
    &nbsp; Approval
    </label>

    { //Check if message failed
      
        (role === 'Hod')
          ? <input type="textArea" className='card-text'  onChange={handleChange2}/> 
          :<input type="textArea" className='card-text'  onChange={handleChange2} disabled />
    
      }
      <div>
    { //Check if message failed
        (role === 'Hod')
          ?<button className="btn btn-primary" onClick={submit}>Go somewhere</button>
          :<button className="btn btn-primary" disabled>Go somewhere</button>
    }
    </div>
  </div>
</div>

<div className="card" style={{width: "18rem",marginLeft:"30px"}}>
  <img className="card-img-top" src="download.jfif" alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">Dean</h5>
    <label>
    
    { //Check if message failed
      
        (role === 'Dean')
          ?<input type="radio" value="true" name="approve_teacher" onChange={handleChange3_radio}/>
          :<input type="radio" value="true" name="approve_teacher"  onChange={handleChange3_radio} disabled/> 
    
    }
    &nbsp; Approval
    </label>

    { //Check if message failed
      
        (role === 'Dean')
          ? <input type="textArea" className='card-text'  onChange={handleChange3} /> 
          :<input type="textArea" className='card-text' onChange={handleChange3} disabled />
  
      }
      <div>
    { //Check if message failed
        (role === 'Dean')
          ?<button className="btn btn-primary" onClick={submit}>Go somewhere</button>
          :<button className="btn btn-primary" disabled>Go somewhere</button>
    }
    </div>
  </div>
</div>


<div className="card" style={{width: "18rem",marginLeft:"30px"}}>
  <img className="card-img-top" src="download.jfif" alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">AICTE Member</h5>
    <label>
    
    { //Check if message failed
    
        (role === 'AICTE Member')
          ?<input type="radio" value="true" name="approve_teacher"  onChange={handleChange4_radio}/>
          :<input type="radio" value="true" name="approve_teacher"  onChange={handleChange4_radio} disabled/> 
      
    }
    &nbsp; Approval
    </label>
  
    { //Check if message failed
      
        (role === 'AICTE Member')
          ? <input type="textArea" className='card-text'  onChange={handleChange4} /> 
          :<input type="textArea" className='card-text'   onChange={handleChange4}  disabled />

      }
      <div>
    { //Check if message failed
        (role === 'AICTE Member')
          ?<button className="btn btn-primary" onClick={submit}>Go somewhere</button>
          :<button className="btn btn-primary" disabled>Go somewhere</button>
    }
    </div>
  </div>
</div>

    </div>
    </>
  )
}

export default Approval;