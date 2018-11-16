import React, { Component } from 'react'
import App from './App'
import FindOwnersPage from './components/owners/FindOwnersPage'
import VeterinariansPage from './components/veterinarians/VeterinariansPage'
import ErrorPage from './components/error/ErrorPage'
import { Route, Switch } from 'react-router-dom'
import OwnerInformationPage from './components/owners/OwnerInformationPage';
import OwnersPage from './components/owners/OwnersPage'
import Nav from './components/common/Nav'
import UpdateOwnerPage from './components/owners/UpdateOwnerPage'
import AddPetPage from './components/pets/AddPetPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdatePetPage from './components/pets/UpdatePetPage'
import AddVisitPage from './components/visits/AddVisitPage'


export default class Router extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/owners' component={FindOwnersPage} />
          <Route exact path='/ownerInformations/:lastname' component={OwnerInformationPage} />
          <Route exact path='/updateOwner/:id' component={UpdateOwnerPage} />
          <Route exact path='/listOwners' component={OwnersPage} />
          <Route exact path='/updatePet/:id' component={UpdatePetPage} />
          <Route exact path='/addPet/:ownerId' component={AddPetPage} />
          <Route exact path='/addVisit/:petId' component={AddVisitPage} />
          <Route exact path='/veterinarians' component={VeterinariansPage} />
          <Route exact path='/error' component={ErrorPage} />
          <Route component={ErrorPage} />
        </Switch>
        <ToastContainer />
      </div>
    )
  }
}
