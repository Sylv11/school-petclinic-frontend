import React, { Component } from 'react';
import App from './components/home/App';
import FindOwners from './components/findOwners/FindOwners';
import Veterinarians from './components/veterinarians/Veterinarians';
import Error from './components/error/Error';
import { Route } from 'react-router-dom';


export default class Router extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={App} />
        <Route exact path='/owners' component={FindOwners} />
        <Route exact path='/veterinarians' component={Veterinarians} />
        <Route exact path='/error' component={Error} />
      </div>
    );
  }
}
