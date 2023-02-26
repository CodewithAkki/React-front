import React, { Component } from 'react';
import './slider.css';
export class slider extends Component {
  render() {
    return (
      <div>

<div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
<center>
  <div className="carousel-inner">

    <div className="carousel-item active">
      <img src="https://free.aicte-india.org/files/home.jpg" className="d-block" alt="Slide 1"/>
    </div>
    <div className="carousel-item">
      <img src="https://manavrachna.edu.in/wp-content/uploads/2020/08/Saksham.jpg" className="d-block " alt="Slide 2"/>
    </div>
    <div className="carousel-item">
      <img src="https://images.shiksha.com/mediadata/images/articles/1587708572phpeAlJvE.jpeg" className="d-block " alt="Slide 3"/>
    </div>
  </div>
  </center>
  <div className='buttons'>
  <button className="carousel-control-prev " type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  </div>
</div>

         </div>
    )
  }
}

export default slider