import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as axios from 'axios';
import { useDispatch } from 'react-redux';
import { memberSlice } from './../features/memberSlice'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';

const RenderdSubCat = () => {
    var axios = require("axios")
    const dispatch = useDispatch()
    const categories = useSelector(state => state.members.categories)

    const token = useSelector(state => state.auth.token)
    const headers = { Authorization: `Bearer ${token}` }
    const url = 'http://localhost:8000/api/sub_category/'

    const [type, setType] = useState("add")
    const [addModalS, setaddModalS] = useState(false)
    const [update, setUpdate] = useState(false)

    const renderdCategories = categories.map(c => { return <option value={c.id}>{c.category_name}</option> })

    const AddModal = () => {
        const formik = useFormik({
            initialValues: { sub_category_name: current.sub_category_name, primary_category: current.primary_category },
            onSubmit: (values, { resetForm }) => {
                setaddModalS(!addModalS)
                switch (type) {
                    case "add":
                        addCategory(values.sub_category_name, values.primary_category);
                        break;
                    case "delete":
                        deleteCategory();
                        break;
                    default:
                        modifyCategory(values.sub_category_name, values.primary_category);
                        break;
                }
                updateDisplay()
                resetForm()
            }
        });

        function addCategory(new_name, primary_category) {
            var config = {
                method: 'post',
                url: url,
                headers: headers,
                data: { sub_category_name: new_name, primary_category: primary_category }
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


        function modifyCategory(new_name, primary_category) {
            var config = {
                method: 'put',
                url: url,
                headers: headers,
                data: { id: current.id, sub_category_name: new_name, primary_category_id: primary_category }
            };
            axios(config)
                .catch(e => console.log({ e }))
        }

        function updateDisplay() {
            const headers = { headers: { "Authorization": `Bearer ${token}` } }
            axios.get('http://localhost:8000/api/sub_category/', headers)
                .then(res => { dispatch(memberSlice.actions.setSubCategory(res.data)) })
                .catch(e => console.log('Error fetching data records', { e }))

            setTimeout(setUpdate(!update), 200)
        }

        return (
            <Modal isOpen={addModalS} toggle={() => setaddModalS(!addModalS)}>
                <ModalHeader close={<button className="close" onClick={() => setaddModalS(!addModalS)}>×
                </button>}>Form SubCategory</ModalHeader>
                <ModalBody>
                    <Form onSubmit={formik.handleSubmit}>
                        <Container>
                            {type != "delete" ?
                                <React.Fragment>
                                    <FormGroup>
                                        <Row>
                                            <Col xs="4" className="align-items-center">
                                                <Label>Primary Category</Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    className='form-control'
                                                    name="primary_category"
                                                    id="primary_category"
                                                    type="select"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.primary_category}
                                                    placeholder='Insert the new Member Name'
                                                    required
                                                >
                                                    {renderdCategories}
                                                </Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={4}>
                                                <Label>SubCategory Name</Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    name="sub_category_name"
                                                    id="sub_category_name"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.sub_category_name}
                                                    placeholder='Insert the new Member Name'
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup></React.Fragment> :
                                <Container>
                                    <Row>
                                        <Col xs={12}>
                                            <span>Are you sure to delete?</span>
                                        </Col>
                                    </Row>
                                    <Row className='text-center'>
                                        <Col xs={12} >
                                            <span><h3 className='deleteName'>{current.sub_category_name}</h3></span>
                                        </Col>
                                    </Row>
                                </Container>
                            }
                            {type != "delete" ?
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button type="submit" className='subButton' color='primary'>
                                            Save SubCategory
                                        </Button>
                                        <Button type="reset" className='subButton' onClick={() => setaddModalS(!addModalS)} color='secondary'>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row> :
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button type="submit" className='subButton' color='danger'>
                                            Delete sub category
                                        </Button>
                                        <Button type="reset" className='subButton' onClick={() => setaddModalS(!addModalS)} color='secondary'>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>}

                        </Container>
                    </Form >
                </ModalBody>
            </Modal>);
    }

    const subcategories = useSelector(state => state.members.subcategories)
    const [current, setCurrent] = useState({})
    if (subcategories.lenght > 0) {setCurrent(subcategories[0])}

    let i = 0;
    const subcategoriesRendered = subcategories.map((r) => {
        i++;
        return (
            <tr>
                <th>{i}</th>
                <td>{r.sub_category_name}</td>
                <td>{categories.find(c => c.id == r.primary_category).category_name}</td>
                <td>
                    <Button color="primary" onClick={() => { setaddModalS(!addModalS); setType("update"); setCurrent(r) }} ><i className='fa fa-refresh'></i></Button>
                    <Button color="danger" onClick={() => { setaddModalS(!addModalS); setType("delete"); setCurrent(r) }} ><i className='fa fa-trash-o sm'></i></Button>
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
                        <h2>Sub Category</h2>
                    </Col>
                    <Col>
                        <Button color='success' onClick={() => { setaddModalS(!addModalS); setType("add") }}>Add sub category</Button>
                    </Col>
                </Row>
                <Row className='text-center'>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Related Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategoriesRendered}
                        </tbody>
                    </Table>
                </Row>
            </Col>
        </Row>
    );

}
export default RenderdSubCat;
