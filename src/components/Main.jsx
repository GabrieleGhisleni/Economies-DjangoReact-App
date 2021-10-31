import  React, { Component } from 'react';
import { useSelector } from 'react-redux';

import Retrive from './Data';
import LoginForm from './Login'
import LogoutForm from './Logout'
import Footer from './Footer';
import MyNav from './NBar';
import Default from './Default'


const Main = () => {
    const isLogged = useSelector(state => state.auth.isLogged)
    return(
        <React.Fragment>
            <MyNav />
            {isLogged?  <Default /> :<Retrive />}
            <Footer/>
        </React.Fragment>
    )
    
}

export default Main;