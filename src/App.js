import React, { Component } from 'react'
import './assets/css/index.css'
import PetsImage from './components/common/PetsImage'

export default class App extends Component {
  render() {
    return (
      <div className='home-container'>
        <div className='home-subcontainer'>
          <h3>Welcome in the petclinic tool!</h3>
          <PetsImage />
        </div>
      </div>
    )
  }
}
