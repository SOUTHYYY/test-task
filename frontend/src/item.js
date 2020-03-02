import React from 'react'

const DataItem = ({gps, country, timezone}) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{gps[0]}</td>
                        <td>{gps[1]}</td>
                        <td>{country}</td>
                        <td>{timezone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default DataItem
