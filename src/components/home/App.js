import React, { Component } from 'react';
import '../../assets/css/index.css';
import dogsAndCats from '../../assets/img/dogs_and_cats.png';
import Nav from '../../components/common/Nav';

export default class App extends Component {
  render() {
    return (
      <div className='home-container'>
        <Nav />
        <div className='home-subcontainer'>
          <h3>Welcome in the petclinic tool !</h3>
          <img src={dogsAndCats} alt='Dogs and cats' />
        </div>
      </div>
    );
  }
}
