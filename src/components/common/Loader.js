import React from 'react'
import loader from '../../assets/img/loader.svg'

const styleImage = {
    height: 124,
    width: 124
}

const styleContainer = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%'
}
const Loader = () => {
    return (
        <div style={styleContainer}>
            <img src={loader} style={styleImage} alt='loader' />
        </div>
    )
}

export default Loader