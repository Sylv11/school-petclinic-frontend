import React from 'react'
import loader from '../../assets/img/loader.svg'


const Loader = (props) => {
    const styleImage = {
        height: props.height,
        width: props.width
    }
    
    const styleContainer = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%'
    }
    
    return (
        <div style={styleContainer}>
            <img src={loader} style={styleImage} alt='loader' />
        </div>
    )
}

export default Loader