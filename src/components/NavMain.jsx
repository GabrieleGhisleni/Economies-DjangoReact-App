import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, Container } from 'reactstrap';
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
        <Navbar light expand='xs' className='myNav'>
            <Container>
            <NavbarBrand> <NavLink to='/home'> Economies  <img src='static/piggy_bank.png' width='35' alt='logo piggy bank'/> </NavLink></NavbarBrand>
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
