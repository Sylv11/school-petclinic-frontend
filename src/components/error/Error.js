import React from 'react'
import PetsImage from '../common/PetsImage'
import '../../assets/css/index.css'

const Error = () => {
    return (
        <div>
            <div className='home-subcontainer error'>
                <PetsImage />
                <h3>Something wrong happend...</h3>
            </div>
        </div>
    )
}

export default Error