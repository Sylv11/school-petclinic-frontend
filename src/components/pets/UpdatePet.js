import React, { Component } from 'react'
import '../../assets/css/index.css'
import '../../assets/css/findOwner.css'
import '../../assets/css/pet.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Loader from '../common/Loader'

class UpdatePet extends Component {

    state = {
        pet: null,
        owner: null,
        loading: true
    }

    getPet = async () => {
        const id = this.props.match.params.id
        const result = await axios.get(`http://localhost:8080/getPet/${id}`)
        return await result
    }

    setPet = () => {
        this.getPet()
            .then((result) => {
                this.setState({ pet: result.data, loading: false })
            })
            .catch((err) => console.log(err))
    }

    getOwner = async () => {
        const ownerId = this.state.pet.ownerId
        const result = await axios.get(`http://localhost:8080/getOwner/${ownerId}`)
        return await result
    }

    setOwner = () => {
        this.getOwner()
            .then((result) => {
                this.setState({ owner: result.data })
            })
            .catch((err) => console.log(err))
    }

    updatePet = async () => {
        const pet = {
            id: this.state.pet.id,
            ownerId: this.state.pet.ownerId,
            name: this.inputName.value,
            dateBirth: this.inputDateBirth.value,
            type: this.inputType.value,
        }

        try {
            await axios.put(`http://localhost:8080//updatePet/${pet.id}`, pet)
            this.props.history.push({
                pathname: `/ownerInformations/${this.state.owner.lastname}`,
                state: {
                    petUpdated: true
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    componentWillMount = () => {
        this.setPet()     
    }

    componentDidUpdate = () => {
        if(!this.state.owner) {
            this.setOwner()
        }
        
        if(this.state.pet) {
            switch(this.state.pet.type) {
                case 'cat': this.inputType.selectedIndex = 1; break;
                case 'dog': this.inputType.selectedIndex = 2; break;
                case 'hamster': this.inputType.selectedIndex = 3; break;
                case 'lizard': this.inputType.selectedIndex = 4; break;
                case 'snake': this.inputType.selectedIndex = 5; break;
                default: this.inputType.selectedIndex = 0; break;
            }
        }
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
                        <h3>Pet</h3>
                        <form method='put' onSubmit={(e) => { e.preventDefault(); }}>
                            <div className='form-group pet-form'>
                                <label>Owner</label>
                                {this.state.owner &&
                                    <input className='form-control' size="30" maxLength="80" name="owner" defaultValue={`${this.state.owner.lastname} ${this.state.owner.firstname}`} disabled />
                                }
                            </div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input className='form-control' size="30" maxLength="80" name="name" defaultValue={this.state.pet.name} ref={inputName => this.inputName = inputName} />
                            </div>
                            <div className='form-group'>
                                <label>Birth date</label>
                                <input className='form-control' size="30" maxLength="80" name="birthDate" defaultValue={this.state.pet.dateBirth} ref={inputDateBirth => this.inputDateBirth = inputDateBirth} />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select ref={inputType => this.inputType = inputType}>
                                    <option>bird</option>
                                    <option>cat</option>
                                    <option>dog</option>
                                    <option>hamster</option>
                                    <option>lizard</option>
                                    <option>snake</option>
                                </select>
                            </div>
                            <div className='form-group' style={{ textAlign: 'center' }}>
                                <button className='btn-default' style={style} type='button' value='text' name='updatePet' onClick={this.updatePet}>Update Pet</button>
                            </div>
                        </form>
                    </div>
                    : (<Loader height={124} width={124} />)}
            </div>
        )
    }
}

export default withRouter(UpdatePet)