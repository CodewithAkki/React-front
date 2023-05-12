import {React,useState,useEffect} from 'react'
import Navbar from '../components/NavbarComp'
import SubNavbar from '../components/subNavbar'
import Dean from '../Dean/dean'
import Guid from '../Guid/guid'
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

  useEffect(() => {
    handleGuid()
  }, []);
return (
    <>
    <Navbar/>
<div className='bar'>
{guid &&  <button
              className='btnguid'
              type="submit"
              onClick={handleGuid1}
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
{guid && <Guid/>}
{hod1 && <Hod/>}
{dean1 && <Dean/>}
{aict1  && <Aicte/>}

    </>
)
}
export default Approval;