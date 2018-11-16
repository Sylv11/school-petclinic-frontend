import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import Loader from '../common/Loader'
import Check from '../../Check'
import Visit from './common/Visit'

export default class AddVisit extends Component {

    state = {
        pet: null,
        owner: null,
        visits: [],
        loading: false
    }

    getPet = async () => {
        const petId = this.props.match.params.petId
        this.setState({ loading: true })
        const result = await axios.get(`http://localhost:8080/getPet/${petId}`)
        return await result
    }

    setPet = () => {
        this.getPet()
            .then((result) => {
                this.setState({ pet: result.data })
            })
            .catch((err) => { })
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

    getVisits = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/getVisitsOfPet/${this.state.pet.id}`)
            this.setState({ loading: false })
            return await result
        } catch (err) { 
            this.setState({ loading: false }) 
            if(this.visitsTable && this.visitsTitle) {
                this.visitsTitle.style.display = 'none'
                this.visitsTable.style.display = 'none'
            }
        }
        console.clear()
    }

    setVisits = () => {
        this.getVisits()
            .then((result) => {                
                let visits = []

                if(result) {
                    result.data.forEach(visit => {
                        visits.push(
                            <Visit key={visit.id} date={visit.date} description={visit.description}/>
                        )
                    });
    
                    this.setState({ visits })
                    
                    if(this.visitsTable && this.visitsTitle && visits.length > 0) {
                        console.clear()
                        this.visitsTitle.style.display = 'block'
                        this.visitsTable.style.display = 'table'
                    }
                }
            })
            .catch((err) => {
                if(this.visitsTable && this.visitsTitle) {
                    this.visitsTitle.style.display = 'none'
                    this.visitsTable.style.display = 'none'
                }
            })
    }

    addVisit = async () => {
        const visit = {
            petId: this.state.pet.id,
            date: this.inputDate.value,
            description: this.inputDescription.value,
        }

        try {
            if (Check.isDate(visit.date)) {
                if (Check.checkLength(visit.description, 3)) {
                    await axios.post(`http://localhost:8080/addVisit`, visit)
                    this.setVisits()
                    toast("Visit added!", {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-color'
                    });
                    this.inputDate.value = ''
                    this.inputDescription.value = ''
                } else {
                    Check.errorMessage('Description is too short!')
                }
            } else {
                Check.errorMessage('Invalid date format!')
            }
        } catch (e) {
            this.props.history.push('/error')
        }
    }

    componentWillMount = () => {
        this.setPet()
    }

    componentDidUpdate = () => {
        if (!this.state.owner) {
            this.setOwner()
        }

        if (this.state.visits.length === 0) {
            setTimeout(() => {
                this.setVisits()
            }, 1000)
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
            <div className='home-subcontainer'>
                {!this.state.loading ?
                    <div>
                        <h3>New visit</h3>
                        <h4 style={{ marginTop: '10px' }}>Pet</h4>
                        {this.state.pet && this.state.owner &&
                            <table style={{ marginBottom: '30px' }}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Birth date</th>
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
                            <div className='form-group' style={styleMarginLeft}>
                                <label>Date</label>
                                <input className='form-control' style={styleInput} size="30" maxLength="80" placeholder="DD-MM-YYY" name="date" defaultValue="" ref={inputDate => this.inputDate = inputDate} />
                            </div>
                            <div className='form-group' style={styleMarginLeft}>
                                <label>Description</label>
                                <input className='form-control' style={styleInput} size="30" maxLength="80" placeholder="Example of description" name="description" defaultValue="" ref={inputDescription => this.inputDescription = inputDescription} />
                            </div>
                            <div className='form-group'>
                                <button className='btn-default' style={{ marginLeft: '67px' }} type='button' value='text' name='addVisit' onClick={this.addVisit}>Add Visit</button>
                            </div>
                        </form>
                        <h4 style={{ marginTop: '10px' }} ref={visitsTitle => this.visitsTitle = visitsTitle}>Previous Visits</h4>
                        <table style={{ marginBottom: '30px' }} ref={visitsTable => this.visitsTable = visitsTable}>
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
                    </div>
                    : (<Loader height={124} width={124} />)}
            </div>
        )
    }
}
