import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

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
            }).catch(err => this.setState({ pets: 'none' }))
    }
    
    componentWillMount = () => {
      this.setPets()
    }
    

    render() {
        const style = {
            color: '#6DB33F'
        }

        return (
            <tr className="vets">
                <td style={style}>{`${this.props.firstname} ${this.props.lastname}`}</td>
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
                    <span>{this.state.pets}</span>
                </td>
            </tr>
        )
    }
}

export default withRouter(Owner)

