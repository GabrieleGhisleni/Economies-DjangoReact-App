import {Nav, Navbar, Collapse, NavItem,NavbarToggler, Container, NavbarBrand} from 'reactstrap'
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';

const SecondNav = () =>{
    const [isOpen, setOpen] = useState(false)

    return(
        <React.Fragment>
            <Navbar light expand='sm' className='secondNav'>
            <Container>
                <NavbarToggler onClick={() => setOpen(!isOpen)} />
                {/* <NavbarBrand> <NavLink to='/'> Summary </NavLink></NavbarBrand> */}

                <Collapse isOpen={isOpen} navbar>
                <Nav navbar className='m-auto'>
                    <NavItem>
                        <NavLink to='/home' className='nav-link'>
                            Summary
                        </NavLink>
                    </NavItem>
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
        </React.Fragment>
    )
    
}

export default SecondNav;