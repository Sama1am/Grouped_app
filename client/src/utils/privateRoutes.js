import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

const PrivateRoutes = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const [token, setToken] = useState(sessionStorage.getItem('accessToken') || searchParams.get('token'));
    

    useEffect(() =>{
        if (token) {
            sessionStorage.setItem('accessToken', token);
        }

    }, [token]);

    
    return(
        token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes