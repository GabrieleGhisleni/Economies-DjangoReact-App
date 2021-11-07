import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import React  from 'react';


import Configurations from './Configuration';
import Dashboard from './Dashboard';
import Default from './Default'
import Stats from './Stats';
import  Registry  from './Registry';

import SecondNav from './NavSecond';
import MyNav from './NavMain';
import Footer from './Footer';


const Main = () => {
    const isLogged = useSelector(state => state.auth.isLogged)
    return (
        <React.Fragment>
            <MyNav />
            {isLogged? <SecondNav/>: <div></div>}
            <Switch>
                <Route exact path="/home" component={isLogged? Dashboard: Default} />
                {isLogged? <Route exact path="/dashboard/" component={Stats} /> : null}
                {isLogged? <Route exact path="/history/" component={Registry} /> : null}
                {isLogged? <Route exact path="/configurations/" component={Configurations} />: null}
                <Redirect to='/home' />
            </Switch>
            <Footer />
        </React.Fragment>
    )
}

export default Main;