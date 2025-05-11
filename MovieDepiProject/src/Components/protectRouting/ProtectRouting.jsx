import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectRouting = ({ children }) => {
    const token = localStorage.getItem("token")
    return token ? children : <Navigate to="/login" state={{ message: "You should log in first" }}/>;
}

export default ProtectRouting