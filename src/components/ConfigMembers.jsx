import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as axios from 'axios';
import { useDispatch } from 'react-redux';
import { memberSlice } from './../features/memberSlice'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';

const RenderMember = () => {
    var axios = require("axios")
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const headers = { Authorization: `Bearer ${token}` }
    const url = 'http://localhost:8000/api/members/'
    const [type, setType] = useState("delete")
    const [addModal, setaddModal] = useState(false)
    const [update, setUpdate] = useState(false)



    const AddModal = () => {
        const formik = useFormik({
            initialValues: { member_name: "" },
            onSubmit: (values, { resetForm }) => {
                setaddModal(!addModal)
                switch (type) {
                    case "add":
                        addMember(values.member_name);
                        break;
                    case "delete":
                        deleteMember();
                        break;
                    default:
                        modifyMember(values.member_name);
                        break;
                }
                updateDisplay()
                resetForm()
            }
        });

        function addMember(new_name) {
            var config = {
                method: 'post',
                url: url,
                headers: headers,
                data: { member_name: new_name }
            };
            axios(config)
                .catch(e => console.log({ e }))
        }

        function deleteMember() {
            var config = {
                method: 'delete',
                url: url,
                headers: headers,
                data: { id: current.id }
            };

            axios(config)
                .catch(e => console.log({ e }))
        }


        function modifyMember(new_name) {
            var config = {
                method: 'put',
                url: url,
                headers: headers,
                data: { id: current.id, member_name: new_name }
            };
            axios(config)
                .catch(e => console.log({ e }))
        }

        function updateDisplay() {
            const headers = { headers: { "Authorization": `Bearer ${token}` } }
            axios.get('http://localhost:8000/api/members/', headers)
                .then(res => { dispatch(memberSlice.actions.setMembers(res.data)) })
                .catch(e => console.log('Error fetching data records', { e }))

            setTimeout(setUpdate(!update), 200)
        }


        return (
            <Modal isOpen={addModal} toggle={() => setaddModal(!addModal)}>
                <ModalHeader close={<button className="close" onClick={() => setaddModal(!addModal)}>×
                </button>}>Form</ModalHeader>
                <ModalBody>
                    <Form onSubmit={formik.handleSubmit}>
                        <Container>
                            {type != "delete" ?
                                <FormGroup>
                                    <Row className="align-items-center">
                                        <Col xs="4" >
                                            <Label>Member Name</Label>
                                        </Col>
                                        <Col>
                                            <Input
                                                name="member_name"
                                                id="member_name"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.member_name}
                                                placeholder='Insert the new Member Name'
                                                required
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup> :
                                <Container>
                                    <Row>
                                        <Col xs={12}>
                                            <span>Are you sure to delete?</span>
                                        </Col>
                                        </Row>
                                        <Row className='text-center'>
                                            <Col xs={12} >
                                                <span><h3 className='deleteName'>{current.member_name}</h3></span>
                                            </Col>
                                        </Row>


                                </Container>
                            }
                            {type != "delete" ?
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button type="submit" className='subButton' color='primary'>
                                            Save Member
                                        </Button>
                                        <Button type="reset" className='subButton' onClick={() => setaddModal(!addModal)} color='secondary'>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row> :
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button type="submit" className='subButton' color='danger'>
                                            Delete Member
                                        </Button>
                                        <Button type="reset" className='subButton' onClick={() => setaddModal(!addModal)} color='secondary'>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>}

                        </Container>
                    </Form >
                </ModalBody>
            </Modal>);
    }

    const members = useSelector(state => state.members.members)
    const [current, setCurrent] = useState({})
    if (members.lenght > 0) {setCurrent(members[0])}

    let i = 0;
    const membersRendered = members.map((r) => {
        i++;
        return (
            <tr>
                <th>{i}</th>
                <td>{r.member_name}</td>
                <td>
                    <Button color="primary" onClick={() => { setaddModal(!addModal); setType("update"); setCurrent(r) }} ><i className='fa fa-refresh'></i></Button>
                    <Button color="danger" onClick={() => { setaddModal(!addModal); setType("delete"); setCurrent(r) }} ><i className='fa fa-trash-o sm'></i></Button>
                </td>
            </tr>
        );
    });
    return (
        <Row className='confRow'>
            <AddModal />
            <Col>
                <Row>
                    <Col xs='auto'>
                        <h2>Member</h2>
                    </Col>
                    <Col>
                        <Button color='success' onClick={() => { setaddModal(!addModal); setType("add") }}>Add Member</Button>
                    </Col>
                </Row>
                <Row className='text-center'>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {membersRendered}
                        </tbody>
                    </Table>
                </Row>
            </Col>
        </Row>
    );

}
export default RenderMember;
