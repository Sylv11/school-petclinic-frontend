import React from 'react'

const Vet = (props) => {
    return (
        <tr className="vets">
            <td>{props.firstname}</td>
            <td>
                <span>{props.speciality}</span>
            </td>
        </tr>
    )
}

export default Vet
