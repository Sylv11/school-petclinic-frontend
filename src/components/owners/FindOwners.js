import React, { Component } from 'react'
import '../../assets/css/index.css'
import '../../assets/css/findOwner.css'
import './AddModal'
import classNames from 'classnames'
import AddModal from './AddModal'


export default class Owners extends Component {

  state = {
    clicked: false
  }

  getClassNames = () => {
    return classNames({
      'hidden': !this.state.clicked,
      'show': this.state.clicked
    });
  }

  toggleModal = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  findOwner = () => {
    let lastname = this.inputValue.value
    if (lastname) this.props.history.push(`/ownerInformations/${lastname}`)
    else this.props.history.push(`/listOwners`)
  }

  render() {
    return (
      <div>
        <div className={`modal ${this.getClassNames()}`}>
          <AddModal toggleModal={this.toggleModal} />
        </div>
        <div className="home-subcontainer">
          <h3>Find Owners</h3>
          <form method='get' onSubmit={(e) => { e.preventDefault(); this.findOwner() }}>
            <div className='form-group'>
              <label>Lastname</label>
              <input className='form-control' size="30" maxLength="80" name="lastName" defaultValue="" ref={inputValue => this.inputValue = inputValue} />
            </div>
            <div className='form-group'>
              <button className='btn-default' type='button' value='text' name='findOwner' onClick={this.findOwner}>Find owner</button>
            </div>
          </form>
          <button className='btn-default' type='button' value='text' name='goToAdd' onClick={this.toggleModal}>Add owner</button>
        </div>
      </div>
    )
  }
}
