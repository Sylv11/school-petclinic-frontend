import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Loader from '../../common/Loader'

class Owner extends Component {

    state = {
        pets: null,
        loading: false
    }

    getPetsOfOwner = async () => {
        const ownerId = this.props.id
        this.setState({ loading: true })
        const result = await axios.get(`http://localhost:8080/getPetsOfOwner/${ownerId}`)
        return result
    }

    setPets = () => {
        let pets = this.state.pets
        this.getPetsOfOwner()
            .then((result) => {
                result.data.forEach(pet => {
                    if(!pets){
                        pets = pet.name
                    }else{
                        pets += ', ' + pet.name
                    }
                });
                this.setState({ pets, loading: false })
            })
            .catch(err => this.setState({ pets: 'none' }))
    }
    
    componentWillMount = () => {
      this.setPets()
    }
    

    render() {
        const style = {
            color: '#6DB33F',
            cursor: 'pointer'
        }

        return (
            <tr className="vets">
                <td onClick={() => this.props.history.push(`ownerInformations/${this.props.lastname}`)}><span id='name' style={style} >{`${this.props.firstname} ${this.props.lastname}`}</span></td>
                <td>
                    <span>{this.props.address}</span>
                </td>
                <td>
                    <span>{this.props.city}</span>
                </td>
                <td>
                    <span>{this.props.telephone}</span>
                </td>
                <td>
                    <span>{this.state.pets ? this.state.pets : <Loader height={16} width={16}/>}</span>
                </td>
            </tr>
        )
    }
}

export default withRouter(Owner)

