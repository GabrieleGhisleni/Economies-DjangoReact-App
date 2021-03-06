import {
    Button, Col, Container, Form, FormGroup, Input,
    Label, Modal, ModalBody, ModalHeader, Row, Table
} from 'reactstrap';

import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { memberSlice } from './../features/memberSlice';
import toast, { Toaster } from 'react-hot-toast';
import calculateWith from "./container_width";

const Registry = () => {
    var axios = require("axios")
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const categories = useSelector(state => state.members.categories);
    const headers = { Authorization: `Bearer ${token}` };
    const BASE_URL = useSelector(state => state.members.base_url);
    const url = `${BASE_URL}/api/records/`;

    const [type, setType] = useState("update");
    const [addModalS, setaddModalS] = useState(false);
    const [iModal, setInfoModal] = useState(false);

    const renderdCategories = categories.map(c => { return (<option key={c.id} value={c.id}>{c.category_name}</option>); })

    const Info = () => {
        const member__name = current? members.find((c) => c.id == current.made_by):null
        const categories_name = current? categories.find((c) => c.id == current.category_associated):null
    
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
                            <p>{member__name? member__name.member_name:null} </p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={4}>
                            <h6>Main Category</h6>
                        </Col>
                        <Col>
                            <p>{categories_name? categories_name.category_name:null}</p>
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
                shared: current.shared.toString(),
            },
            onSubmit: (values, { resetForm }) => {
                setaddModalS(!addModalS)
                if (values.sub_category_associated == -1) { values.sub_category_associated = null }
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
                .catch(e => ({ e })) //console.log
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
                .then((values) => {
                    dispatch(memberSlice.actions.updateRecord({values}))
                    toast.success('Successfully updated!', { duration: 4000, position: 'top-center',})})
                .catch(e => 
                    toast.error('Something went wrong!', {duration: 4000, position: 'top-center',})) //console.log
        }
        const renderedMembers = members.map((m) => { return <option key={m.id} value={m.id}>{m.member_name}</option> });
        const selectedSub = subcategories.filter(sb => sb.primary_category == formik.values.category_associated)
        const renderedSubCategories = selectedSub.map((m) => { return <option key={m.id} value={m.id}>{m.sub_category_name}</option> });
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
        <Row className="align-items-center">
            <Col>
              <Label>Shared</Label>
            </Col>
            <Col xs='auto'>
                        <FormGroup check inline>
                                <Label check><Input type="radio" 
                                name='shared' value={"true"}
                                checked={(formik.values.shared) === "true"}
                                onChange={formik.handleChange}/> Shared </Label>
                        </FormGroup>
                        <FormGroup check inline>
                                <Label check><Input type="radio" 
                                name='shared' value={"false"}
                                checked={(formik.values.shared) === "false"}
                                onChange={formik.handleChange}/> Not Shared </Label>
                        </FormGroup>      
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
                                                    name="sub_category_associated"
                                                    id="sub_category_associated"
                                                    type="select"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.sub_category_associated}
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


    const formik_s = useFormik({ initialValues: { category: -1 } })
    var filteredRecords;
    if (formik_s.values.category != -1) {
        filteredRecords = records.filter(o => o.category_associated == formik_s.values.category)
    } else { filteredRecords = records }

    let i = 0;
    const recordsRendered = filteredRecords.map((r) => {
        i++;
        return (
            <tr key={r.id}>
                <td>{i}</td>
                <td>{r.record_name}</td>
                <td>{r.price}</td>
                <td>{members.find(c => c.id == r.made_by).member_name}</td>
                <td>{r.shared.toString()}</td>
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
    let myWidth = calculateWith(window.innerWidth);
    return (
        <Container fluid style={{width:myWidth}}>
            < Toaster/>
            {current? <Info />:null}
           {current?  <AddModal />: null}
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
                                    <th>Shared</th>
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
