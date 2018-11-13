import React from 'react'
import petsImage from '../../assets/img/dogs_and_cats.png'

const PetsImage = () => {
    return (
        <div>
            <img src={petsImage} alt='Dogs and cats' />
        </div>
    )
}

export default PetsImage