import {Nav, Navbar, Collapse, NavItem,NavbarToggler, Container, NavbarBrand} from 'reactstrap'
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';

const SecondNav = () =>{
    const [isOpen, setOpen] = useState(false)

    return(
   
            <Navbar light expand='lg' className='secondNav'>
            <Container>
                <NavbarBrand> <NavLink to='/home'> Summary </NavLink></NavbarBrand>
                <NavbarToggler onClick={() => setOpen(!isOpen)} />

                <Collapse isOpen={isOpen} navbar>
                <Nav navbar className='mr-auto'>
                    <NavItem>
                        <NavLink to='/dashboard' className='nav-link'>
                            Dashboards
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/history' className='nav-link'>
                            Registry
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/configurations' className='nav-link'>
                            Configurations
                        </NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Container>
            </Navbar>
    )
    
}

export default SecondNav;