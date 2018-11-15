import React, { Component } from 'react'
import '../../assets/css/pet.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Pet extends Component {

    state = {
        visits: []
    }

    getVisits = async () => {
        const result = await axios.get(`http://localhost:8080/getVisitsOfPet/${this.props.id}`)
        return await result
    }

    setVisits = () => {
        this.getVisits()
        .then((result) => {
            let visits = []

            result.data.forEach(visit => {
                visits.push(
                    <tr key={visit.id}>
                        <td>{visit.date}</td>
                        <td>{visit.description}</td>
                    </tr>
                )
            });

            this.setState({visits})
        })
        .catch((err) => {}) 
    }

    componentWillMount = () => {
      this.setVisits()
    }
    

    render() {
        return (
            <tr>
                <td>
                    <dl>
                        <dt>Name</dt>
                        <dd>{this.props.name}</dd>
                        <br/>
                        <dt>Birth date</dt>
                        <dd>{this.props.dateBirth}</dd>
                        <br/>
                        <dt>Type</dt>
                        <dd>{this.props.type}</dd>
                    </dl>
                </td>
                <td>
                    <table>
                        <thead>
                            <tr>
                                <th>Visit date</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.visits}
                            <div>
                                <span onClick={(e) => this.props.history.push(`/updatePet/${this.props.id}`)}>Edit Pet</span>
                                <span>Add Visit</span>
                            </div>
                        </tbody>
                    </table>
                </td>
            </tr>
        )
    }
}

export default withRouter(Pet)
