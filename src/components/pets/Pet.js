import React, { Component } from 'react'
import '../../assets/css/pet.css'

export default class Pet extends Component {
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
            </tr>
        )
    }
}
