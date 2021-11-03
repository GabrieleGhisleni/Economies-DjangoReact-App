import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { memberSlice } from './../features/memberSlice'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import * as axios from 'axios';

const RenderdCategory = () => {
    var axios = require("axios")
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const headers = { Authorization: `Bearer ${token}` }
    const url = 'http://localhost:8000/api/category/'
    const [type, setType] = useState("delete")
    const [addModalC, setaddModalC] = useState(false)
    const [update, setUpdate] = useState(false)


    const AddModalS = () => {
        const formik = useFormik({
            initialValues: { category_name: "" },
            onSubmit: (values, { resetForm }) => {
                setaddModalC(!addModalC)
                switch (type) {
                    case "add":
                        addCategory(values.category_name);
                        break;
                    case "delete":
                        deleteCategory();
                        break;
                    default:
                        modifyCategory(values.category_name);
                        break;
                }
                console.log('out')
                updateDisplay()
                resetForm()
            }
        });
        function addCategory(new_name) {
            var config = {
                method: 'post',
                url: url,
                headers: headers,
                data: { category_name: new_name }
            };
            axios(config)
                .catch(e => console.log({ e }))
        }

        function deleteCategory() {
            var config = {
                method: 'delete',
                url: url,
                headers: headers,
                data: { id: current.id }
            };

            axios(config)
                .catch(e => console.log({ e }))
        }


        function modifyCategory(new_name) {
            var config = {
                method: 'put',
                url: url,
                headers: headers,
                data: { id: current.id, category_name: new_name }
            };
            axios(config)
                .catch(e => console.log(e))
        }

        function updateDisplay() {
            const headers = { headers: { "Authorization": `Bearer ${token}` } }
            axios.get('http://localhost:8000/api/category/', headers)
                .then(res => { dispatch(memberSlice.actions.setCategory(res.data)) })
                .catch(e => console.log('Error fetching data records', { e }))
            setTimeout(setUpdate(!update), 200)
        }



        return (
            <Modal isOpen={addModalC} toggle={() => setaddModalC(!addModalC)}>
                <ModalHeader close={<button className="close" onClick={() => setaddModalC(!addModalC)}>×
                </button>}>Form Categories</ModalHeader>
                <ModalBody>
                    <Form onSubmit={formik.handleSubmit}>
                        <Container>
                            {type != "delete" ?
                                <FormGroup>
                                    <Row>
                                        <Col xs="4" className="align-items-center">
                                            <Label>Category Name</Label>
                                        </Col>
                                        <Col>
                                            <Input
                                                name="category_name"
                                                id="category_name"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.category_name}
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
                                            <span><h3 className='deleteName'>{current.category_name}</h3></span>
                                        </Col>
                                    </Row>
                                </Container>
                            }
                            {type != "delete" ?
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button type="submit" className='subButton' color='primary'>
                                            Save Category
                                        </Button>
                                        <Button type="reset" className='subButton' onClick={() => setaddModalC(!addModalC)} color='secondary'>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row> :
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button type="submit" className='subButton' color='danger'>
                                            Delete Category
                                        </Button>
                                        <Button type="reset" className='subButton' onClick={() => setaddModalC(!addModalC)} color='secondary'>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>}

                        </Container>
                    </Form >
                </ModalBody>
            </Modal>);
    }


    const categories = useSelector(state => state.members.categories)
    const [current, setCurrent] = useState({})
    if (categories.lenght > 0) {setCurrent(categories[0])}

    let i = 0;
    const categoriesRendered = categories.map((r) => {
        i++;
        return (
            <tr>
                <th>{i}</th>
                <td>{r.category_name}</td>
                <td>
                    <Button color="primary" onClick={() => { setaddModalC(!addModalC); setType("update"); setCurrent(r) }} ><i className='fa fa-refresh'></i></Button>
                    <Button color="danger" onClick={() => { setaddModalC(!addModalC); setType("delete"); setCurrent(r) }} ><i className='fa fa-trash-o sm'></i></Button>
                </td>
            </tr>
        );
    });
    return (
        <Row className='confRow'>
            <AddModalS />
            <Col>
                <Row>
                    <Col xs='auto'>
                        <h2>Category</h2>
                    </Col>
                    <Col>
                        <Button color='success' onClick={() => { setaddModalC(!addModalC); setType("add") }}>Add Category</Button>
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
                            {categoriesRendered}
                        </tbody>
                    </Table>
                </Row>
            </Col>
        </Row>
    );

}
export default RenderdCategory;
