import React, { Component } from 'react';
import Navbar from './navbar/navbar';
import NavbarComp from '../components/NavbarComp';
import Footer from '../about/footer/footer';
import Reviews from './revirews/review';
import Slider from './slider/slider';
import './homepage.css';
export class homepage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
         
        <div className="university">
          <img className="university" src="https://images.unsplash.com/photo-1609134545248-1a41853280b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
           alt="univercity" />
        </div>
     =
      <div className='navBar'>
            <NavbarComp/>
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