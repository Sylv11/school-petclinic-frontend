import React, { Component } from 'react'
import '../../assets/css/index.css'
import '../../assets/css/findOwner.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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
            await axios.post('http://localhost:8080/addOwner', owner)
            this.props.history.push(`/ownerInformations/${owner.lastname}`)
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
                        <input className='form-control' size="30" maxLength="80" placeholder="Firstname" name="firstname" defaultValue="" ref={inputFirstname => this.inputFirstname = inputFirstname} />
                    </div>
                    <div className='form-group'>
                        <label>Lastname</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="Lastname" name="lastName" defaultValue="" ref={inputLastname => this.inputLastname = inputLastname} />
                    </div>
                    <div className='form-group'>
                        <label>Address</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="Address" name="address" defaultValue="" ref={inputAddress => this.inputAddress = inputAddress} />
                    </div>
                    <div className='form-group'>
                        <label>City</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="City" name="city" defaultValue="" ref={inputCity => this.inputCity = inputCity} />
                    </div>
                    <div className='form-group'>
                        <label>Telephone</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="Telephone" name="telephone" defaultValue="" ref={inputTelephone => this.inputTelephone = inputTelephone} />
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