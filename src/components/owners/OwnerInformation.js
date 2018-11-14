import React, { Component } from 'react'
import Nav from '../common/Nav'
import axios from 'axios'
import Loader from '../common/Loader'
import Modal from './common/Modal'
import '../../assets/css/index.css'
import '../../assets/css/modal.css'
import classNames from 'classnames'

export default class OwnerInformation extends Component {

    state = {
        owner: null,
        loading: false,
        clicked: false
    }

    getOwner = async () => {
        const { lastname } = this.props.match.params
        this.setState({ loading: true })
        const result = await axios.get(`http://localhost:8080/getOwnerByLastname/${lastname}`)
        return await result
    }

    toggleLoading = () => {
        this.setState({ loading: true })
    }

    setOwner = () => {
        this.getOwner()
            .then((result) => {
                this.setState({ owner: result.data, loading: false })
            })
            .catch((err) => this.props.history.push('/error'))
    }

    getClassNames = () => {
        return classNames({
            'hidden': !this.state.clicked,
            'show':  this.state.clicked
        });
    }

    toggleModal = () => {
        this.setState({clicked: !this.state.clicked})
    }

    componentWillMount() {
        this.setOwner()
    }

    render() {
        const style = {
            marginRight: '10px',
            marginTop: '20px',
            marginLeft: '0px'
        }

        return (
            <div>
                <div className={`modal ${this.getClassNames()}`}>
                    <Modal toggleModal={this.toggleModal} setOwner={this.setOwner} toggleLoading={this.toggleLoading} loading={this.state.loading} {...this.state.owner} />
                </div>
                <Nav />
                <div className='home-subcontainer'>
                    {!this.state.loading ?
                        (<div>
                            <h3>Owner Informations</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>
                                            <span>{`${this.state.owner.lastname} ${this.state.owner.firstname}`}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>
                                            <span>{this.state.owner.address}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>City</td>
                                        <td>
                                            <span>{this.state.owner.city}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Telephone</td>
                                        <td>
                                            <span>{this.state.owner.telephone}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className='btn-default' style={style} type='button' value='text' name='editOwner' onClick={this.toggleModal}>Edit owner</button>
                            <button className='btn-default' style={style} type='button' value='text' name='addNewPet'>Add new Pet</button>
                        </div>)
                        : (<Loader height={124} width={124} />)}
                </div>
            </div>
        )
    }
}
