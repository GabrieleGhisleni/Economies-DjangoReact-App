import {
    Button, Col, Container, Form, FormGroup, Input,
    Label, Modal, ModalBody, ModalHeader, Row, Table
} from 'reactstrap';

import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as axios from 'axios';
import { memberSlice } from './../features/memberSlice'

const Registry = () => {
    var axios = require("axios")
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const categories = useSelector(state => state.members.categories)
    const headers = { Authorization: `Bearer ${token}` }
    const url = 'http://localhost:8000/api/records/'

    const [type, setType] = useState("update")
    const [addModalS, setaddModalS] = useState(false)
    const [iModal, setInfoModal] = useState(false)

    const renderdCategories = categories.map(c => { return <option value={c.id}>{c.category_name}</option> })

    const Info = () => {
        return (
            <Modal size='lg' isOpen={iModal} toggle={() => setInfoModal(!iModal)}>
                <ModalHeader close={<button className="close" onClick={() => setInfoModal(!iModal)}>×
                </button>}>Detail Record</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs={4}><h6>Title</h6></Col>
                        <Col><p>{current.record_name}</p></Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={4}>
                            <h6>Price</h6>
                        </Col>
                        <Col>
                            <p>{current.price}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={4}>
                            <h6>Member</h6>
                        </Col>
                        <Col>
                            <p> {current? members.find((c) => c.id == current.made_by).member_name: null}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={4}>
                            <h6>Main Category</h6>
                        </Col>
                        <Col>
                            <p>{current? categories.find((c) => c.id == current.category_associated).category_name: null}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={4}>
                            <h6>Sub Category</h6>
                        </Col>
                        <Col>
                            <p>{current.sub_category_associated ? subcategories.find((sc) => sc.id == current.sub_category_associated).sub_category_name : 'Null'}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={4}>
                            <h6>Created at</h6>
                        </Col>
                        <Col>
                            <p>{current.created_at}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={4}>
                            <h6>Description</h6>
                        </Col>
                        <Col>
                            <p>{current.description}</p>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        )
    };

    const AddModal = () => {
        const formik = useFormik({
            initialValues: {
                record_name: current.record_name,
                price: current.price,
                made_by: current.made_by,
                category_associated: current.category_associated,
                sub_category_associated: current.sub_category_associated,
                description: current.description,
                created_at: current.created_at,
            },
            onSubmit: (values, { resetForm }) => {
                setaddModalS(!addModalS)
                if (values.sub_category_associated === -1) { values.sub_category_associated = null }
                switch (type) {
                    case "delete":
                        deleteCategory(current.id);
                        break;
                    default:
                        modifyCategory({ values });
                        break;
                }
                resetForm()
            }
        });

        function deleteCategory(id) {
            var config = {
                method: 'delete',
                url: url,
                headers: headers,
                data: { id: id }
            };

            axios(config)
                .then(() => {dispatch(memberSlice.actions.removeRecord(current.id))})
                .catch(e => console.log({ e }))
        }


        function modifyCategory({ values }) {
            values.id = current.id
            var config = {
                method: 'put',
                url: url,
                headers: headers,
                data: values
            };
            axios(config)
                .then((values) =>{dispatch(memberSlice.actions.updateRecord({values}))})
                .catch(e => console.log({ e }))
        }

        const renderedMembers = members.map((m) => { return <option value={m.id}>{m.member_name}</option> });
        const selectedSub = subcategories.filter(sb => sb.primary_category == formik.values.category_associated)
        const renderedSubCategories = selectedSub.map((m) => { return <option value={m.id}>{m.sub_category_name}</option> });
        return (
            <Modal isOpen={addModalS} toggle={() => setaddModalS(!addModalS)}>
                <ModalHeader close={<button className="close" onClick={() => setaddModalS(!addModalS)}>×
                </button>}>Form Record</ModalHeader>
                <ModalBody>
                    <Form onSubmit={formik.handleSubmit}>
                        <Container>
                            {type != "delete" ?
                                <React.Fragment>
                                    <FormGroup>
                                        <Row>
                                            <Col xs="4" className="align-items-center">
                                                <Label>Record Name</Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    className='form-control'
                                                    name="record_name"
                                                    id="record_name"
                                                    type="text"
                                                    onChange={(e) => { formik.handleChange(e) }}
                                                    value={formik.values.record_name}

                                                >
                                                </Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs="4" className="align-items-center">
                                                <Label>Price</Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    className='form-control'
                                                    name="price"
                                                    id="price"
                                                    type="number"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.price}

                                                >
                                                </Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs="4" className="align-items-center">
                                                <Label>Member</Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    className='form-control'
                                                    name="made_by"
                                                    id="made_by"
                                                    type="select"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.made_by}

                                                >
                                                    {renderedMembers}
                                                </Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs="4" className="align-items-center">
                                                <Label>Category</Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    className='form-control'
                                                    name="category_associated"
                                                    id="category_associated"
                                                    type="select"
                                                    onChange={(e) => { formik.handleChange(e); formik.values.sub_category = -1 }}
                                                    value={formik.values.category_associated}

                                                >
                                                    {renderdCategories}
                                                </Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={4}>
                                                <Label>Sub category</Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    className='form-control'
                                                    name="sub_category_name"
                                                    id="sub_category_name"
                                                    type="select"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.sub_category_name}
                                                >
                                                    <option value={-1}> None </option>
                                                    {renderedSubCategories}
                                                </Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={4}>
                                                <Label>Description </Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    name="description"
                                                    id="description"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.description}
                                                    placeholder='Description'

                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={4}>
                                                <Label>Created at</Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    name="created_at"
                                                    id="created_at"
                                                    type="date"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.created_at}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </React.Fragment> :
                                <Container>
                                    <Row>
                                        <Col xs={12}>
                                            <span>Are you sure to delete?</span>
                                        </Col>
                                    </Row>
                                    <Row className='text-center'>
                                        <Col xs={12} >
                                            <span><h3 className='deleteName'>{current.record_name}</h3></span>
                                        </Col>
                                    </Row>
                                </Container>
                            }
                            {type != "delete" ?
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button type="submit" className='subButton' color='primary'>
                                            Save Record
                                        </Button>
                                        <Button type="reset" className='subButton' onClick={() => setaddModalS(!addModalS)} color='secondary'>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row> :
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button type="submit" className='subButton' color='danger'>
                                            Delete record
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

    const members = useSelector(state => state.members.members)
    const records = useSelector(state => state.members.records)
    const subcategories = useSelector(state => state.members.subcategories)

    const [current, setCurrent] = useState(records[0])
    const [currentCategory, setcurrentCategory] = useState({})
    


    const formik_s = useFormik({ initialValues: { category: -1 } })
    if (formik_s.values.category != -1) {
        var filteredRecords = records.filter(o => o.category_associated == formik_s.values.category)
    } else { var filteredRecords = records }

    let i = 0;
    const recordsRendered = filteredRecords.map((r) => {
        i++;
        return (
            <tr>
                <td>{i}</td>
                <td>{r.record_name}</td>
                <td>{r.price}</td>
                <td>{members.find(c => c.id == r.made_by).member_name}</td>
                <td>{categories.find(c => c.id == r.category_associated).category_name}</td>
                <td>{r.sub_category_associated ? subcategories.find(sc => sc.id == r.sub_category_associated).sub_category_name : 'Null'}</td>
                <td>{r.created_at}</td>
                <td>
                    <Button color="info" onClick={() => { setCurrent(r); setInfoModal(!iModal); }} ><i className='fa fa-info-circle'></i></Button>
                    <Button color="danger" onClick={() => { setaddModalS(!addModalS); setType("delete"); setCurrent(r) }} ><i className='fa fa-trash-o sm'></i></Button>
                    <Button color="primary" onClick={() => { setaddModalS(!addModalS); setCurrent(r) }} ><i className='fa fa-refresh'></i></Button>
                </td>
            </tr>
        );
    });



    return (
        <Container>
            <Info />
            <AddModal />
            <Form inline className='text-center'>
                <Label>Filter by category &nbsp;</Label>
                <Input
                    name="category"
                    id="category"
                    type="select"
                    onChange={formik_s.handleChange}
                    value={formik_s.values.category}
                    className='form-control'
                >
                    <option value={-1}> None </option>
                    {renderdCategories}
                </Input>
            </Form>
            <Row className='confRow'>

                <Col>
                    <Row className='text-center'>
                        <Table hover responsive striped >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Member</th>
                                    <th>Main Category</th>
                                    <th>Sub Category</th>
                                    <th>Created at</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordsRendered}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row>
        </Container>
    );

}
export default Registry;
