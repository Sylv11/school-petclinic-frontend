import React, { Component } from 'react'
import '../../../assets/css/pet.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import Visit from '../../visits/common/Visit'

class Pet extends Component {

    state = {
        visits: [],
        noVisit: false
    }

    getVisits = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/getVisitsOfPet/${this.props.id}`)
            return await result
        } catch (err) { }

    }

    setVisits = () => {
        this.getVisits()
            .then((result) => {
                let visits = []

                result.data.forEach(visit => {
                    visits.push(
                        <Visit key={visit.id} date={visit.date} description={visit.description} />
                    )
                });

                this.setState({ visits })
            })
            .catch((err) => { this.setState({ noVisit: true }) })
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
                        <br />
                        <dt>Birth date</dt>
                        <dd>{this.props.dateBirth}</dd>
                        <br />
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
                            {this.state.noVisit ?
                                <tr>
                                    <td>none</td>
                                    <td>none</td>
                                </tr>
                                : this.state.visits}
                            <tr className='pet-button'>
                                <td onClick={(e) => this.props.history.push(`/updatePet/${this.props.id}`)}><p>Edit Pet</p></td>
                                <td onClick={(e) => this.props.history.push(`/addVisit/${this.props.id}`)}><p>Add Visit</p></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        )
    }
}

export default withRouter(Pet)
