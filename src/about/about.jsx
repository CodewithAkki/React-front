import React, { Component } from 'react';
import Navbar from './navbar/navbar';
import './about.css';
import Footer from './footer/footer';
import Logo from '../images/AICTE-Logo-250x250-1.webp'

export class about extends Component {
  render() {
    return (
      <div>
            <Navbar/>
        <div className="adjust">
          <center><img src={Logo} alt=''/></center>
          <div>
          <div className='back-para1'>
        <p className='para1'>The beginning of formal technical education in India can be dated back to the mid-19th century. Major policy initiatives in the pre-independence period included the appointment of the Indian Universities Commission in 1902, issue of the Indian Education Policy Resolution in 1904, and the Governor General’s policy statement of 1913 stressing the importance of technical education, the establishment of IISc in Bangalore, Institute for Sugar, Textile & Leather Technology in Kanpur, N.C.E. in Bengal in 1905, and industrial schools in several provinces.</p>
        </div>
        </div>
        </div>
        <div className='sideimg'>
          <div className=''>
            
            <img className='imageside' src="https://www.aicte-india.org/sites/default/files/about_history.jpg" alt="" />
          
          </div>
          <div className='about-content'>
          <h3> Role of National Working Group </h3><div>
<p>&nbsp;&nbsp; The Government of India (the Ministry of Human Resource Development) also constituted a National Working Group to look into the role of AICTE in the context of proliferation of technical institutions, maintenance of standards, and other related matters. The Working Group recommended that AICTE be vested with the necessary statutory authority for making it more effective, which would consequently require restructuring and strengthening with the necessary infrastructure and operating mechanisms.</p></div>
<div className='content-2'>
<h3>
The All India Council For Technical Education Act 1987
</h3>
<p>(No 52 of 1987 as passed by both the Houses of Parliament)

The AICTE Act was constituted to provide for the establishment of an All India Council for Technical Education with a view to proper planning and co-ordinated development of a technical education system throughout the country, the promotion of qualitative improvements of such education in relation to planned quantitative growth, and regulation & proper maintenance of norms and standards in the technical education system and for the matters connected therewith.</p>
</div>
</div>
</div>
<div className='history-content'>
<div className='history-content1'>
  <p>All India Council for Technical Education (AICTE) was set up in November 1945 as a national-level apex advisory body to conduct a survey on the facilities available for technical education and to promote development in the country in a coordinated and integrated manner. And to ensure the same, as stipulated in the National Policy of Education (1986), AICTE was vested with:</p>
  <ui>
    <li>Statutory authority for planning, formulation, and maintenance of norms & standards</li>
    <li>Quality assurance through accreditation</li>
    <li>Funding in priority areas, monitoring, and evaluation</li>
    <li>Maintaining parity of certification & awards</li>
    <li>The management of technical education in the country</li>
  </ui>
  </div>
  <div className='history-content2'>
  <h3>1943</h3>
  <p>Constitution of the Technical Education Committee of the Central Advisory Board of Education (CABE)</p>
  <h3>1944</h3>
  <p>Preparation of the Sergeant Report</p>
  <h3>1945</h3>
  <p>Formation of the All India Council for Technical Education (AICTE)</p>
</div>
</div>
<Footer/>

      </div>
    )
  }
}

export default about