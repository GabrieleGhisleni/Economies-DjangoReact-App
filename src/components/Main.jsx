import React, { Component } from 'react';
import { useSelector } from 'react-redux';

import LoginForm from './Login'
import LogoutForm from './Logout'

import Default from './Default'
import Dashboard from './Dashboard';
import Stats from './Stats';
import Configurations from './Configuration';
import Footer from './Footer';
import MyNav from './NBar';
import History from './History';
import SecondNav from './SecondNav';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


const Main = () => {
    const isLogged = useSelector(state => state.auth.isLogged)
    return (
        <React.Fragment>
            <MyNav />
            {isLogged? <SecondNav/>: <div></div>}
            <Switch>
                <Route exact path="/home" component={isLogged? Dashboard: Default} />
                <Route exact path="/dashboard/" component={Stats} />
                {isLogged? <Route exact path="/dashboard/" component={Stats} /> : null}
                {isLogged? <Route exact path="/history/" component={History} /> : null}
                {isLogged? <Route path="/configurations/" component={Configurations} />: null}
                <Redirect to='/home' />
            </Switch>
            <Footer />
        </React.Fragment>
    )
}

export default Main;