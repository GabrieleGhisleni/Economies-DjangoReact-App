
import React from 'react';
import { NavLink } from 'react-router-dom';
import {NavItem } from 'reactstrap'

import { useDispatch } from 'react-redux';
import authSlice from '../features/userSlice';


const LogoutForm = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {dispatch(authSlice.actions.logout())}

    return (
        <React.Fragment>
            <NavItem className>
                <NavLink to='#' className='nav-link' onClick={handleLogout}>
                    Logout
                </NavLink>
            </NavItem>
        </React.Fragment>  
        )
}

export default LogoutForm;