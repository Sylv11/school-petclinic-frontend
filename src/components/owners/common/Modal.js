import React, { Component } from 'react'
import '../../../assets/css/modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default class Modal extends Component {

    updateOwner = async () => {
        const owner = {
            firstname: this.inputFirstname.value,
            lastname: this.inputLastname.value,
            address: this.inputAddress.value,
            city: this.inputCity.value,
            telephone: this.inputTelephone.value
        }

        try{
            this.props.toggleLoading()
            await axios.put(`http://localhost:8080/updateOwner/${this.props.id}`, owner)
            this.props.setOwner()
            this.props.toggleModal()
        }catch(e){
            this.props.history.push('/error')
        }
    }

    render() {
        return (
            <div className='modal-container'>
                <FontAwesomeIcon className='cross' icon={faTimes} onClick={this.props.toggleModal} />
                <h3>Owner</h3>
                <form method='put' onSubmit={(e) => { e.preventDefault(); }}>
                    <div className='form-group'>
                        <label>Firstname</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="Firstname" name="firstname" defaultValue={this.props.firstname} ref={inputFirstname => this.inputFirstname = inputFirstname} />
                    </div>
                    <div className='form-group'>
                        <label>Lastname</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="Lastname" name="lastName" defaultValue={this.props.lastname} ref={inputLastname => this.inputLastname = inputLastname} />
                    </div>
                    <div className='form-group'>
                        <label>Address</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="Address" name="address" defaultValue={this.props.address} ref={inputAddress => this.inputAddress = inputAddress} />
                    </div>
                    <div className='form-group'>
                        <label>City</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="City" name="city" defaultValue={this.props.city} ref={inputCity => this.inputCity = inputCity} />
                    </div>
                    <div className='form-group'>
                        <label>Telephone</label>
                        <input className='form-control' size="30" maxLength="80" placeholder="Telephone" name="telephone" defaultValue={this.props.telephone} ref={inputTelephone => this.inputTelephone = inputTelephone} />
                    </div>
                    <div className='form-group' style={{textAlign: 'center'}}>
                        <button className='btn-default' type='button' value='text' name='findOwner' onClick={this.updateOwner}>{this.props.loading ? 'Updating...' : 'Update owner'}</button>
                    </div>
                </form>
            </div>
        )
    }
}
