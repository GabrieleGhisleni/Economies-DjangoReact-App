import React, { Component, useState } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom';
// Formik form
import { ErrorMessage, useFormik } from 'formik';
// Redux import
import { useDispatch } from 'react-redux';
import authSlice, { login } from '../features/userSlice';
// persisent and axios
import { useHistory } from "react-router";
import axios from 'axios';
import { Fetch } from './Fetching';


const RegisterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modal, setModal] = useState(false)
    const [col, setCol] = useState('white')
    const [err, setErr] = useState('')
    
    const login = ( username, password,email ) => {
        let url = "http://localhost:8000/auth/register/"
        axios.post(url, { username, password, email })
            .then((res) => {
                dispatch(authSlice.actions.setAuthTokens({
                    token: res.data.access,
                    refreshToken: res.data.refresh,
                }));
                dispatch(authSlice.actions.setAccount(res.data.user));
                history.push('/')
                setModal(!modal)
                return res.data.refresh
            })
            .then(token => Fetch(token))
            .catch(e => {
                setErr(<div className='err btn btn-danger'> Username Not Available!</div>)
                setCol('firebrick')
            });
    }

    const formik = useFormik({
        initialValues: { username: '', password: '', email:'' },
        onSubmit: (values) => { login(values.username, values.password, values.email) },
        validateOnChange: false,
        validateOnBlur: false
    });

    return (
        <React.Fragment>
        <NavItem className>
                <NavLink to='#' className='nav-link'  onClick={() => setModal(!modal)}>
                    Register                           
        </NavLink>
        </NavItem>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} >
                <ModalHeader 
                close={<button className="close" onClick={()=>setModal(!modal)}>×</button>}
                toggle={()=>setModal(!modal)} >Register Form  {err? err: ''}</ModalHeader>
                <ModalBody  style={{backgroundColor: col}}>
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
                                <Label>Email</Label>
                            </Col>
                            <Col>
                                <Input
                                    name='email'
                                    id='email'
                                    type='email'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
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
                                <Button  type='submit' className='primary bg-primary'>
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

export default RegisterForm;