import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/css/index.css'
import Loader from '../common/Loader'
import Owner from './common/Owner'

export default class Owners extends Component {

  state = {
    owners: [],
    pets: [],
    loading: false
  }

  getOwners = async () => {
    this.setState({ loading: true })
    const result = await axios.get('http://localhost:8080/getOwners')
    return await result
  }

  setOwners = () => {
    let owners = []

    this.getOwners()
      .then((result) => {
        result.data.forEach(owner => {
          owners.push(
            <Owner key={owner.telephone} {...owner} />
          )
        })

        this.setState({ owners, loading: false })
      })
      .catch((err) => this.props.history.push('/error'))
  }

  componentWillMount() {
    this.setOwners()
  }

  render() {
    return (
      <div>
        <div className='home-subcontainer'>
          {!this.state.loading ?
            (<div>
              <h3>Owners</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Telephone</th>
                    <th>Pets</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.owners}
                </tbody>
              </table>
            </div>)
            : (<Loader height={124} width={124}/>)}
        </div>
      </div>
    )
  }
}
