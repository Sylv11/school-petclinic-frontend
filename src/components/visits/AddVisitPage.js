import React, { Component } from 'react'
import axios from 'axios'
import Loader from '../common/Loader'
import Check from '../../Check'
import Visit from './common/Visit'
import '../../assets/css/form.css'
import { toast } from 'react-toastify';


export default class AddVisitPage extends Component {

    state = {
        pet: null,
        owner: null,
        visits: [],
        loading: true
    }

    getPet = async () => {
        const response = await axios.get('http://localhost:8080/getPet/' + this.props.match.params.petId)
        return await response
    }

    setPet = () => {
        this.getPet()
            .then(response => this.setState({ pet: response.data, loading: false }))
    }

    getOwner = async () => {
        const response = await axios.get('http://localhost:8080/getOwner/' + this.state.pet.ownerId);
        return await response
    }

    setOwner = () => {
        this.getOwner()
            .then(response => this.setState({ owner: response.data }))
            .catch(err => this.props.history.push('/error'))
    }

    getVisits = async () => {
        const response = await axios.get('http://localhost:8080/getVisitsOfPet/' + this.state.pet.id)
        return await response
    }

    setVisits = () => {
        this.getVisits()
            .then((response) => {
                let visits = []

                response.data.forEach(visit => {
                    visits.push(<Visit key={visit.id} date={visit.date} description={visit.description} />)
                });

                this.setState({ visits });

                if (this.previousTable && this.previousTitle && visits.length > 0) {
                    this.previousTitle.style.display = 'block'
                    this.previousTable.style.display = 'table'
                }
            })
            .catch(err => {
                this.previousTitle.style.display = 'none'
                this.previousTable.style.display = 'none'
            })
    }

    createVisit = async () => {
        const Visit = {
            id: 0,
            petId: parseInt(this.props.match.params.petId),
            date: this.dateInput.value,
            description: this.descriptionInput.value,
        }

        if (Check.isDate(Visit.date)) {
            if (Check.checkLength(Visit.description, 5)) {
                try {
                    await axios.post('http://localhost:8080/addVisit', Visit);
                    this.setVisits()
                    toast("👍🏼 Visit added!", {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-color'
                    });
                } catch (e) {
                    this.infoParagraph.innerHTML = 'Can\'t add visit'
                }
                if (this.infoParagraph) this.infoParagraph.style.display = 'block'

            } else {
                Check.errorMessage('Description too short!')
            }
        } else {
            Check.errorMessage('Invalid date format!')
        }
    }

    componentWillMount() {
        this.setPet()
    }

    componentDidUpdate() {
        if (!this.state.owner) {
            this.setOwner()
        }

        if (this.state.visits.length === 0) {
            this.setVisits()
        }
    }

    render() {

        const styleMarginLeft = {
            marginLeft: '10%'
        }

        const styleInput = {
            width: '65%'
        }

        return (
            <div className="home-subcontainer">
                <h3>New visit</h3>
                <p ref={(info) => this.infoParagraph = info} style={{ display: 'none' }}></p>
                {!this.state.loading ?
                    <div>
                        <h4>Pet</h4>
                        {(this.state.pet && this.state.owner) &&
                            <table style={{ marginBottom: '30px' }}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Birth Date</th>
                                        <th>Type</th>
                                        <th>Owner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.pet.name}</td>
                                        <td>{this.state.pet.dateBirth}</td>
                                        <td>{this.state.pet.type}</td>
                                        <td>{`${this.state.owner.lastname} ${this.state.owner.firstname}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                        <form method='post' onSubmit={(e) => { e.preventDefault(); }}>
                            <div className="form-group" style={styleMarginLeft}>
                                <label>Date</label>
                                <input  className='form-control' style={styleInput} size="30" maxLength="80" placeholder="DD-MM-YYY" name="date" defaultValue="" ref={(input) => this.dateInput = input} />
                            </div>

                            <div className="form-group" style={styleMarginLeft}>
                                <label>Description</label>
                                <input type="text" className='form-control' style={styleInput} size="30" maxLength="80" placeholder="Example of description" name="description" defaultValue=""  ref={(input) => this.descriptionInput = input} />
                            </div>
                            <div className='form-group'>
                                <button className='btn-default' style={{ marginLeft: '67px' }} type='button' value='text' name='addVisit' onClick={this.createVisit}>Add Visit</button>
                            </div>
                        </form>
                        <h4 style={{ marginTop: '10px' }} ref={previousTitle => this.previousTitle = previousTitle}>Previous visits</h4>
                        <table style={{ marginBottom: '30px' }} ref={previousTable => this.previousTable = previousTable}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.visits}
                            </tbody>
                        </table>
                    </div> : <Loader height={124} width={124}/>
                }
            </div>
        )
    }
}
