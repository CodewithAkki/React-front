import React, { Component } from 'react'
import Navbar from './navbar/navbar'
import Support from '../signup/support'
export class signup extends Component {
 

  render() {
    return (
      <div>
        <Navbar/>
        <Support/>
      </div>
    )
  }
}

export default signup