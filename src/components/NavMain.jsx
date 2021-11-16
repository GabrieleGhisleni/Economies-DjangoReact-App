import { Navbar, Nav, NavbarToggler, Collapse, Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import LoginModal from './Login'
import LogoutForm from './Logout';
import RegisterForm from './Register';

const MyNav = () => {
    const [isOpen, setOpen] = useState(false);
    const isLogged = useSelector(state => state.auth.isLogged)

    const AuthenticatedUser = () => {
        return (
            <React.Fragment>
                <LogoutForm />
            </React.Fragment>
        );
    };

    const ExternalUser = () => {
        return (
            <React.Fragment>
                <LoginModal />
                <RegisterForm />
            </React.Fragment>
        );
    };

    return (
        <Navbar light expand='sm' className='myNav'>
            <Container>
          
                <NavLink id='routerlink' to='/home' className='navbar-brand'> Economies  
                    <img src='static/piggy_bank.png' width='35' alt='logo piggy bank'/> 
                </NavLink>
         
            <NavbarToggler onClick={() => setOpen(!isOpen)} />
            
            <Collapse isOpen={isOpen} navbar>
                <Nav navbar className='ml-auto'>
                    {isLogged?  <AuthenticatedUser /> : < ExternalUser /> }
                </Nav>
            </Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNav;
