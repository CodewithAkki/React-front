import React, { Component } from 'react';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import Reviews from './revirews/review';
import Slider from './slider/slider';
import './homepage.css';
import collegeimge from '../images/aicte.jpg'
export class homepage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
         
        <div className="university">
          <img className="university" src={collegeimge}
           alt="univercity" />
        </div>
     =
      <div className='navBar'>
            <Navbar/>
            </div>
            <div className='slider'>
            <Slider/>
            </div>
      <div className='reviews'>
            <Reviews/>
            </div>
      <div className="footer">
            <Footer/>
      </div>
      </div>
    )
  }
}

export default homepage