import React, { useState } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector} from 'react-redux';
import authSlice from '../features/userSlice';
import memberSlice from '../features/memberSlice';
import { useHistory } from "react-router";
import axios from 'axios';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modal, setModal] = useState(false)
    const [col, setCol] = useState('white')
    const [notavailable, setnotavailable] = useState(<div></div>)
    const BASE_URL = useSelector(state => state.members.base_url)

    const register = (username, password, email) => {

        axios.post(`${BASE_URL}/auth/register/`, { username, password, email })
            .then((res) => {
                dispatch(authSlice.actions.setAuthTokens(
                    { token: res.data.token, refreshToken: res.data.refresh, }));
                dispatch(authSlice.actions.setAccount(res.data.user));
                history.push('/')
                setModal(!modal)
                return (res.data.token)
            }).then(token => {
                const headers = { headers: { "Authorization": `Bearer ${token}` } }

                
                // axios.get(`${BASE_URL}/api/records/` , headers)
                // .then(res => {dispatch(memberSlice.actions.setRecords(res.data)) })
                // .catch(e => ({e})) //console.log

                axios.get(`${BASE_URL}/api/category/`, headers)
                .then(res => {dispatch(memberSlice.actions.setCategory(res.data)) })
                .catch(e =>  ({e})) //console.log

                axios.get(`${BASE_URL}/api/sub_category/`, headers)
                .then(res => {dispatch(memberSlice.actions.setSubCategory(res.data)) })
                .catch(e =>  ({e})) //console.log

                axios.get(`${BASE_URL}/api/members/`, headers)
                .then(res => { dispatch(memberSlice.actions.setMembers(res.data))})
                .catch(e =>  ({e})) //console.log
            })
            .catch(e => {
            
                try{
                    if ({e}.e.response.data.user_already_taken) setnotavailable(<div style={{color:"firebrick"}}>User Not Available</div>)}
                catch{}
                setCol('#E74C3C'); setTimeout(()=> {setCol('white'); setnotavailable(<div></div>)}, 5000)
            });
    }

    const formik = useFormik({
        initialValues: { username: '', password: '', email: '' },
        onSubmit: (values) => { register(values.username, values.password, values.email) },
        validateOnChange: false,
        validateOnBlur: false,
        onReset: (e, {resetForm}) => {resetForm({})}
    });

    return (
        <React.Fragment>
            <NavItem className>
                <NavLink to='#' className='nav-link' onClick={() => setModal(!modal)}>
                    Register
                </NavLink>
            </NavItem>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} >
                <ModalHeader
                    close={<button className="close" onClick={() => setModal(!modal)}>×</button>}
                    toggle={() => setModal(!modal)} >Register Form     {notavailable}</ModalHeader>
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

export default RegisterForm;