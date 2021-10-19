import React from 'react'
import { useHistory, useLocation } from "react-router-dom";

const Error404 = () => {
    const history = useHistory()
    history.push('/')


    return (
        <div>

        </div>
    )
}

export default Error404