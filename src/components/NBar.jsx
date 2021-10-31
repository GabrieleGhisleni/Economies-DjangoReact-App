import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import React, { useState, Component } from 'react';
import LoginModal from './Login'
import LoginForm from './Login'
import LogoutForm from './Logout';
import RegisterForm from './Register';

const MyNav = () => {
    const [isOpen, setOpen] = useState(false);
    const isLogged = useSelector(state => state.auth.isLogged)

    const AuthenticatedUser = () => {
        return (
            <React.Fragment>
                <LogoutForm />
                <span>profile</span>
            </React.Fragment>
        );
    };

    function ExternalUser() {
        return (
            <React.Fragment>
                <LoginModal />
                <RegisterForm />
            </React.Fragment>
        );
    };

    return (
        <Navbar light expand='md' className='myNav'>
            <Container>
            <NavbarBrand> <NavLink to='/home'> Economies </NavLink></NavbarBrand>
            <NavbarToggler onClick={() => setOpen(!isOpen)} />
            <Collapse isOpen={isOpen} navbar>
                <Nav navbar className='ml-auto'>
                    <NavItem>
                        <NavLink to='/' className='nav-link'>
                            Home
                        </NavLink>
                    </NavItem>
                    {isLogged?  <AuthenticatedUser /> : ExternalUser() }
                </Nav>
            </Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNav;
