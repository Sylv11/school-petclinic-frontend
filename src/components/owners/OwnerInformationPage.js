import React, { Component } from 'react'
import axios from 'axios'
import Loader from '../common/Loader'
import '../../assets/css/index.css'
import '../../assets/css/modal.css'
import Pet from '../pets/common/Pet'
import { toast } from 'react-toastify';

export default class OwnerInformation extends Component {

    state = {
        owner: null,
        pets: [],
        loading: false,
        noPets: false
    }

    getOwner = async () => {
        const { lastname } = this.props.match.params
        this.setState({ loading: true })
        const result = await axios.get(`http://localhost:8080/getOwnerByLastname/${lastname}`)
        return await result
    }

    getPets = async () => {
        if (!this.state.loading) this.setState({ loading: true })
        const result = await axios.get(`http://localhost:8080/getPetsOfOwner/${this.state.owner.id}`)
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

    setPets = () => {
        this.getPets()
            .then((result) => {
                let pets = []

                result.data.forEach(pet => {
                    pets.push(
                        <Pet key={pet.id} {...pet} />
                    )
                })

                this.setState({ pets, loading: false })
            })
            .catch(err => {
                this.setState({ loading: false, noPets: true })
                this.title.style.display = 'none'
            })

    }

    componentWillMount() {
        this.setOwner()
    }

    componentDidMount() {
        let emoji
        if (this.props.location.state) {
            switch (this.props.location.state.petType) {
                case 'bird':
                    emoji = '🦅'
                    break

                case 'cat':
                    emoji = '🐱'
                    break

                case 'dog':
                    emoji = '🐶'
                    break

                case 'hamster':
                    emoji = '🐹'
                    break

                case 'lizard':
                    emoji = '🦎'
                    break

                case 'snake':
                    emoji = '🐍'
                    break

                default:
                    emoji = '🐶'
            }
            if (this.props.location.state) {
                if (this.props.location.state.ownerAdded) {
                    toast("👱🏼 Owner created!", {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-color'
                    });
                }
                if (this.props.location.state.ownerUpdated) {
                    toast("👱🏼 Owner updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-color'
                    });
                }
                if (this.props.location.state.petAdded) {
                    toast(emoji + " Pet added!", {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-color'
                    });
                }
                if (this.props.location.state.petUpdated) {
                    toast(emoji + " Pet updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-color'
                    });
                }
            }
        }
    }

    componentDidUpdate() {
        if (this.state.pets.length === 0 && !this.state.noPets) {
            this.setPets()
        }
    }

    render() {
        const style = {
            marginRight: '10px',
            marginTop: '20px',
            marginLeft: '0px'
        }

        const styleTitle = {
            marginTop: '15px'
        }

        return (
            <div>
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
                            <button className='btn-default' style={style} type='button' value='text' name='editOwner' onClick={() => this.props.history.push(`/updateOwner/${this.state.owner.id}`)}>Edit owner</button>
                            <button className='btn-default' style={style} type='button' value='text' name='addNewPet' onClick={() => this.props.history.push(`/addPet/${this.state.owner.id}`)}>Add new Pet</button>
                            <h3 style={styleTitle} ref={title => this.title = title}>Pets and Visits</h3>
                            <table>
                                <tbody>
                                    {this.state.pets}
                                </tbody>
                            </table>
                        </div>)
                        : (<Loader height={124} width={124} />)}
                </div>
            </div>
        )
    }
}
