import React from 'react'
import '../../assets/css/logo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog } from '@fortawesome/free-solid-svg-icons'

const Logo = () => {
    return (
        <div className='home-logo'>
            <FontAwesomeIcon className='circle-icon' icon={faDog} />
            <span> Petclinic</span>
        </div>
    )
}

export default Logo