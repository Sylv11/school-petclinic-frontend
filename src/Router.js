import React, { Component } from 'react'
import App from './components/home/App'
import FindOwners from './components/findOwners/FindOwners'
import Veterinarians from './components/veterinarians/Veterinarians'
import Error from './components/error/Error'
import { Route, Switch } from 'react-router-dom'
import OwnerInformation from './components/ownerInformation/OwnerInformation';
import Owners from './components/owners/Owners'


export default class Router extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/owners' component={FindOwners} />
          <Route exact path='/ownerInformations/:lastname' component={OwnerInformation} />
          <Route exact path='/listOwners' component={Owners} />
          <Route exact path='/veterinarians' component={Veterinarians} />
          <Route exact path='/error' component={Error} />
          <Route component={Error} />
        </Switch>
      </div>
    )
  }
}
