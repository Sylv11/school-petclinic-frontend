import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../common/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faList, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import '../../assets/css/nav.css';


export default class Nav extends Component {
  render() {
    return (
      <nav>
        <Logo />
        <NavLink className='nav-item' activeClassName='active-link' exact to='/'><FontAwesomeIcon icon={faHome} /> Home</NavLink>
        <NavLink className='nav-item' activeClassName='active-link' to='/owners'><FontAwesomeIcon icon={faSearch} /> Find owners</NavLink>
        <NavLink className='nav-item' activeClassName='active-link' to='/veterinarians'><FontAwesomeIcon icon={faList} /> Veterinarians</NavLink>
        <NavLink className='nav-item' activeClassName='active-link' to='/error'><FontAwesomeIcon icon={faExclamationTriangle} /> Error</NavLink>
      </nav>
    );
  }
}
