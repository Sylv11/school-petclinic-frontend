import React, { Component } from 'react'
import axios from 'axios'
import Vet from './common/Vet'
import '../../assets/css/index.css'
import Loader from '../common/Loader'

export default class Veterinarians extends Component {

  state = {
    vets: [],
    loading: false
  }

  getVets = async () => {
    this.setState({ loading: true })
    const result = await axios.get('http://localhost:8080/getVets')
    return await result
  }

  setVets = () => {
    let vets = []

    this.getVets()
      .then((result) => {
        result.data.forEach(vet => {
          vets.push(
            <Vet key={vet.lastname} {...vet}/>
          )
        })

        this.setState({ vets, loading: false })
      })
      .catch((err) => this.props.history.push('/error'))
  }

  componentWillMount() {
    this.setVets()
  }

  render() {
    return (
      <div>
        <div className='home-subcontainer'>
          {!this.state.loading ?
            (<div>
              <h3>Veterinarians</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Specialities</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.vets}
                </tbody>
              </table>
            </div>)
            : (<Loader height={124} width={124}/>)}
        </div>
      </div>
    )
  }
}
