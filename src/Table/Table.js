import React from 'react'
import { Link } from 'react-router-dom'

export default function Table({ rows, cols }) {
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {
                            cols && cols.length? cols.map((col, index) => {
                                return <th key={index} scope="col">{col}</th>
                            }): null
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows && rows.length? rows.map((row, index) => {
                            return <tr key={index} scope="col">
                                {
                                    row.data && row.data.length ? row.data.map((item, subIndex) => {
                                        if(item.type === "link") {
                                            return <td key={subIndex}><Link to={item.url}>{item.data}</Link></td>
                                        } else {
                                            return <td key={subIndex}>{item.data}</td>
                                        }
                                    }): null
                                }
                            </tr>
                        }): null
                    }
                </tbody>
            </table>
        </>
    )
}
