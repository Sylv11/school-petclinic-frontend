import React, { Component } from 'react'
import '../../assets/css/modal.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Loader from '../common/Loader'
import Check from '../../Check'

class UpdateOwner extends Component {

    state = {
        owner: null,
        loading: false
    }

    getOwner = async () => {
        const { id } = this.props.match.params
        this.setState({ loading: true })
        const result = await axios.get(`http://localhost:8080/getOwner/${id}`)
        return await result
    }

    setOwner = () => {
        this.getOwner()
            .then((result) => {
                this.setState({ owner: result.data, loading: false })
            })
            .catch((err) => this.props.history.push('/error'))
    }

    updateOwner = async () => {
        const owner = {
            id: this.props.match.params.id,
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
                                this.setState({ loading: true })
                                await axios.put(`http://localhost:8080/updateOwner/${owner.id}`, owner)
                                this.setOwner()
                                this.setState({ loading: false })
                                this.props.history.push({
                                    pathname: `/ownerInformations/${owner.lastname}`,
                                    state: {
                                        ownerUpdated: true
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

    componentWillMount = () => {
        this.setOwner()
    }

    render() {

        const style = {
            width: '55%',
            marginLeft: '0px'
        }

        return (
            <div className='home-subcontainer'>
                {!this.state.loading ?
                    <div>
                        <h3>Owner</h3>
                        <form method='put' onSubmit={(e) => { e.preventDefault(); }}>
                            <div className='form-group'>
                                <label>Firstname</label>
                                <input className='form-control' size="30" maxLength="80" name="firstname" defaultValue={this.state.owner.firstname} ref={inputFirstname => this.inputFirstname = inputFirstname} />
                            </div>
                            <div className='form-group'>
                                <label>Lastname</label>
                                <input className='form-control' size="30" maxLength="80" name="lastName" defaultValue={this.state.owner.lastname} ref={inputLastname => this.inputLastname = inputLastname} />
                            </div>
                            <div className='form-group'>
                                <label>Address</label>
                                <input className='form-control' size="30" maxLength="80" name="address" defaultValue={this.state.owner.address} ref={inputAddress => this.inputAddress = inputAddress} />
                            </div>
                            <div className='form-group'>
                                <label>City</label>
                                <input className='form-control' size="30" maxLength="80" name="city" defaultValue={this.state.owner.city} ref={inputCity => this.inputCity = inputCity} />
                            </div>
                            <div className='form-group'>
                                <label>Telephone</label>
                                <input className='form-control' size="30" maxLength="80" name="telephone" defaultValue={this.state.owner.telephone} ref={inputTelephone => this.inputTelephone = inputTelephone} />
                            </div>
                            <div className='form-group' style={{ textAlign: 'center' }}>
                                <button className='btn-default' style={style} type='button' value='text' name='updateOwner' onClick={this.updateOwner}>Update Owner</button>
                            </div>
                        </form>
                    </div>
                    : (<Loader height={124} width={124} />)}
            </div>
        )
    }
}

export default withRouter(UpdateOwner)
