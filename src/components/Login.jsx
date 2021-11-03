import React, { Component, useState } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom';
// Formik form
import { ErrorMessage, useFormik } from 'formik';
// Redux import
import { useDispatch } from 'react-redux';
import authSlice, { login } from '../features/userSlice';
import memberSlice from '../features/memberSlice';
// persisent and axios
import { useHistory } from "react-router";
import axios from 'axios';
// 
import { Fetch } from './Fetching';


const LoginModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modal, setModal] = useState(false)
    const [col, setCol] = useState('white')
    const [err, setErr] = useState('')

    const login = (username, password) => {
        let url = "http://localhost:8000/auth/login/";
        axios.post(url, { username, password })
            .then((res) => {
                dispatch(authSlice.actions.setAuthTokens({
                    token: res.data.access,
                    refreshToken: res.data.refresh,
                }));
                dispatch(authSlice.actions.setAccount(res.data.user));
                history.push('/')
                setModal(!modal)
                return res.data.access})
            .then(token =>  Fetch(token, dispatch))
            .catch(e => {
                console.log({ e })
                setErr(<div className='err btn btn-danger'> User or Password ARE not Valid</div>)
                setCol('firebrick')
            })
        

    }

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: (values) => { login(values.username, values.password) },
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
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader
                    close={<button className="close" onClick={() => setModal(!modal)}>×</button>}
                    toggle={() => setModal(!modal)} >Login Form {err ? err : ''}</ModalHeader>
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
                                <Button className='primary bg-secondary '>
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