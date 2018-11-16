import React from 'react'

const Visit = (props) => {
    return (
        <tr>
            <td>{props.date}</td>
            <td>{props.description}</td>
        </tr>
    )
}

export default Visit