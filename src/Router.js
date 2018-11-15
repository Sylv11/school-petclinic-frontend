import React, { Component } from 'react'
import App from './components/home/App'
import FindOwners from './components/owners/FindOwners'
import Veterinarians from './components/veterinarians/Veterinarians'
import Error from './components/error/Error'
import { Route, Switch } from 'react-router-dom'
import OwnerInformation from './components/owners/OwnerInformation';
import Owners from './components/owners/Owners'
import Nav from './components/common/Nav'
import UpdateOwner from './components/owners/UpdateOwner'
import AddPet from './components/pets/AddPet'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdatePet from './components/pets/UpdatePet'


export default class Router extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/owners' component={FindOwners} />
          <Route exact path='/ownerInformations/:lastname' component={OwnerInformation} />
          <Route exact path='/updateOwner/:id' component={UpdateOwner} />
          <Route exact path='/updatePet/:id' component={UpdatePet} />
          <Route exact path='/addPet/:ownerId' component={AddPet} />
          <Route exact path='/listOwners' component={Owners} />
          <Route exact path='/veterinarians' component={Veterinarians} />
          <Route exact path='/error' component={Error} />
          <Route component={Error} />
        </Switch>
        <ToastContainer />
      </div>
    )
  }
}
