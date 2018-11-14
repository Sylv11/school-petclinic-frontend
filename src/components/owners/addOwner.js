import React, { Component } from 'react'
import Nav from '../common/Nav'
import '../../assets/css/index.css'
import '../../assets/css/findOwner.css'
import axios from 'axios'

export default class addOwner extends Component {



    addOwner = async () => {
        const owner = {
            firstname: this.inputFirstname.value,
            lastname: this.inputLastname.value,
            address: this.inputAddress.value,
            city: this.inputCity.value,
            telephone: this.inputTelephone.value
        }

        try{
            await axios.post('http://localhost:8080/addOwner', owner)
            this.props.history.push(`/ownerInformations/${owner.lastname}`)
        }catch(e){
            this.props.history.push('/error')
        }
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="home-subcontainer">
                    <h3>Owner</h3>
                    <form method='post' onSubmit={(e) => { e.preventDefault(); }}>
                        <div className='form-group'>
                            <label>Firstname</label>
                            <input className='form-control' size="30" maxLength="80" name="firstname" defaultValue="" ref={inputFirstname => this.inputFirstname = inputFirstname} />
                        </div>
                        <div className='form-group'>
                            <label>Lastname</label>
                            <input className='form-control' size="30" maxLength="80" name="lastName" defaultValue="" ref={inputLastname => this.inputLastname = inputLastname} />
                        </div>
                        <div className='form-group'>
                            <label>Address</label>
                            <input className='form-control' size="30" maxLength="80" name="address" defaultValue="" ref={inputAddress => this.inputAddress = inputAddress} />
                        </div>
                        <div className='form-group'>
                            <label>City</label>
                            <input className='form-control' size="30" maxLength="80" name="city" defaultValue="" ref={inputCity => this.inputCity = inputCity} />
                        </div>
                        <div className='form-group'>
                            <label>Telephone</label>
                            <input className='form-control' size="30" maxLength="80" name="telephone" defaultValue="" ref={inputTelephone => this.inputTelephone = inputTelephone} />
                        </div>
                        <div className='form-group'>
                            <button className='btn-default' type='button' value='text' name='findOwner' onClick={this.addOwner}>Add owner</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
