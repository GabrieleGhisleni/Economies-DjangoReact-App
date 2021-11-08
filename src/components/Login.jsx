import React, { Component, useState } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom';
// Formik form
import { useFormik } from 'formik';
// Redux import
import { useDispatch } from 'react-redux';
import authSlice, { login } from '../features/userSlice';
import memberSlice from '../features/memberSlice';
// persisent and axios
import { useHistory } from "react-router";
import * as axios from 'axios';
// 



const LoginModal = (force) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modal, setModal] = useState(false)
    const [col, setCol] = useState('white')
    const [wrongdata, setwrongdata] = useState(<div></div>)
    var axios = require('axios');

    const login = (username, password) => {
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/auth/login/',
            headers: { 'Content-Type': 'application/json' },
            data: { username: username, password: password }
        };
        axios(config)
            .then(res => {
                dispatch(authSlice.actions.setAuthTokens(
                    { token: res.data.access, refreshToken: res.data.refresh }
                ));
                dispatch(authSlice.actions.setAccount(res.data.user));
                history.push('/')
                setModal(!modal)
                return (res.data.access)})
            .then(token =>{

                const headers = { headers: { "Authorization": `Bearer ${token}` } }

                axios.get('http://localhost:8000/api/records/', headers)
                .then(res => {dispatch(memberSlice.actions.setRecords(res.data)) })
                .catch(e => ({ e })) //console.log

                axios.get('http://localhost:8000/api/category/', headers)
                .then(res => {dispatch(memberSlice.actions.setCategory(res.data)) })
                .catch(e => ({ e })) //console.log

                axios.get('http://localhost:8000/api/sub_category/', headers)
                .then(res => {dispatch(memberSlice.actions.setSubCategory(res.data)) })
                .catch(e => ({ e })) //console.log

                axios.get('http://localhost:8000/api/members/', headers)
                .then(res => { dispatch(memberSlice.actions.setMembers(res.data))})
                .catch(e => ({ e })) //console.log
            })
            .catch(e => {
                    try{if ({e}.e.response.data.detail === ('Wrong data')) setwrongdata(<div style={{color:"firebrick"}}>Wrong Data</div>)}
                    catch{}
                    setCol('#E74C3C'); setTimeout(()=> {setCol('white'); setwrongdata(<div></div>)}, 5000)})
   



    }

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: (values, {setErrors, setStatus, resetForm}) => { 
            login(values.username, values.password) 
        },
        onReset: (e, {resetForm}) => {resetForm({})},
        validateOnChange: false,
        validateOnBlur: false
    });

    return (
        <React.Fragment>
            <NavItem className>
                <NavLink to='#' className='nav-link' onClick={() => setModal(!modal)}>
                    Login
                </NavLink>
            </NavItem>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} >
                <ModalHeader
                    close={<button className="close" onClick={() => setModal(!modal)}>×</button>}
                    toggle={() => setModal(!modal)} >Login Form {wrongdata}</ModalHeader>
                <ModalBody style={{ backgroundColor: col }}>
                    <Form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <Col>
                                <Label>Username</Label>
                            </Col>
                            <Col>
                                <Input
                                    name='username'
                                    id='username'
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col>
                                <Label>Password</Label>
                            </Col>
                            <Col>
                                <Input
                                    name='password'
                                    id='password'
                                    type='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <Row className='ml-auto'>
                            <Col xs={2}>
                                <Button type='submit' className='primary bg-primary'>
                                    Submit
                                </Button>
                            </Col>
                            <Col xs={2}>
                                <Button type='reset' className='primary bg-secondary '>
                                    Cancel
                                </Button>
                            </Col>
                            <Col xs='auto' className='text-center align-items-center '>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default LoginModal;