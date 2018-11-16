import React, { Component } from 'react'
import '../../assets/css/index.css'
import '../../assets/css/form.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Check from '../../Check'


class AddModal extends Component {



    addOwner = async () => {
        const owner = {
            firstname: this.inputFirstname.value,
            lastname: this.inputLastname.value,
            address: this.inputAddress.value,
            city: this.inputCity.value,
            telephone: this.inputTelephone.value
        }

        try {
            if (Check.isString(owner.firstname, 3)) {
                if (Check.isString(owner.lastname, 3)) {
                    if (Check.checkLength(owner.address, 5)) {
                        if (Check.isString(owner.city, 3)) {
                            if (Check.isPhoneNumber(owner.telephone)) {
                                await axios.post('http://localhost:8080/addOwner', owner)
                                this.props.history.push({
                                    pathname: `/ownerInformations/${owner.lastname}`,
                                    state: {
                                        ownerAdded: true
                                    }
                                })
                            } else {
                                Check.errorMessage('Invalid format phone number! Must have 10 ciphers')
                            }
                        } else {
                            Check.errorMessage('City is not a string or too short!')
                        }
                    } else {
                        Check.errorMessage('Address is too short!')
                    }
                } else {
                    Check.errorMessage('Lastname in not a string or too short!')
                }
            } else {
                Check.errorMessage('Firstname in not a string or too short!')
            }
        } catch (e) {
            this.props.history.push('/error')
        }
    }

    render() {
        return (
            <div className='modal-container'>
                <FontAwesomeIcon icon={faTimes} className='cross' onClick={this.props.toggleModal} />
                <h3>Owner</h3>
                <form method='put' onSubmit={(e) => { e.preventDefault(); }}>
                    <div className='form-group'>
                        <label>Firstname</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="John" name="firstname" defaultValue="" ref={inputFirstname => this.inputFirstname = inputFirstname} />
                    </div>
                    <div className='form-group'>
                        <label>Lastname</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="Doe" name="lastName" defaultValue="" ref={inputLastname => this.inputLastname = inputLastname} />
                    </div>
                    <div className='form-group'>
                        <label>Address</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="12 street" name="address" defaultValue="" ref={inputAddress => this.inputAddress = inputAddress} />
                    </div>
                    <div className='form-group'>
                        <label>City</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="City" name="city" defaultValue="" ref={inputCity => this.inputCity = inputCity} />
                    </div>
                    <div className='form-group'>
                        <label>Telephone</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="0111111111" name="telephone" defaultValue="" ref={inputTelephone => this.inputTelephone = inputTelephone} />
                    </div>
                    <div className='form-group' style={{ textAlign: 'center' }}>
                        <button className='btn-default' type='button' value='text' name='addOwner' onClick={this.addOwner}>Add Owner</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(AddModal)