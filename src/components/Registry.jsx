import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as axios from 'axios';
import { useDispatch } from 'react-redux';
import { memberSlice } from './../features/memberSlice'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';

const Registry = () => {
    var axios = require("axios")
    const dispatch = useDispatch()
    const categories = useSelector(state => state.members.categories)

    const token = useSelector(state => state.auth.token)
    const headers = { Authorization: `Bearer ${token}` }
    const url = 'http://localhost:8000/api/records/'
    const [type, setType] = useState("add")
    const [addModalS, setaddModalS] = useState(false)
    const renderdCategories = categories.map(c => { return <option value={c.id}>{c.category_name}</option> })

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
                switch (type) {
                    case "delete":
                        deleteCategory();
                        break;
                    default:
                        modifyCategory({values});
                        break;
                }
                updateDisplay()
                resetForm()
            }
        });

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


        function modifyCategory({values}) {
            values.id = current.id
            var config = {
                method: 'put',
                url: url,
                headers: headers,
                data: values
            };
            axios(config)
                .catch(e => console.log({ e }))
        }

        function updateDisplay() {
            const headers = { headers: { "Authorization": `Bearer ${token}` } }
            axios.get(url, headers)
                .then(res => { dispatch(memberSlice.actions.setRecords(res.data)) })
                .catch(e => console.log('Error fetching data records', { e }))
        }

        const renderedMembers = members.map((m) => { return <option value={m.id}>{m.member_name}</option> });
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
                                                    onChange={(e) => {formik.handleChange(e)}}
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
                                                    onChange={(e) => {formik.handleChange(e);}}
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
                                        <Button type="submit" className='subButton'  color='danger'>
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

    const [current, setCurrent] = useState({})
    const [currentCategory, setcurrentCategory] = useState({})

    if (records.lenght > 0) {setCurrent(records[0]); setcurrentCategory(records[0].category_associated)}
    const selectedSub = subcategories.filter(sb => sb.primary_category == currentCategory)
    const renderedSubCategories = selectedSub.map((m) => {return <option value={m.id}>{m.sub_category_name}</option>});

    let i = 0;
    const recordsRendered = records.map((r) => {
        i++;
        return (
            <tr>
                <td>{i}</td>
                <td>{r.record_name}</td>
                <td>{r.price}</td>
                <td>{members.find(c => c.id == r.made_by).member_name}</td>
                <td>{categories.find(c => c.id == r.category_associated).category_name}</td>
                <td>{r.sub_category_associated ? subcategories.find(sc => sc.id == r.sub_category_associated).sub_category_name : 'Null'}</td>
                <td>{r.description ? r.description : 'Null'}</td>
                <td>{r.created_at}</td>
                <td>
                    <Button color="primary" onClick={() => { setaddModalS(!addModalS); setType("update"); setCurrent(r) }} ><i className='fa fa-refresh'></i></Button>
                    <Button color="danger" onClick={() => { setaddModalS(!addModalS); setType("delete"); setCurrent(r) }} ><i className='fa fa-trash-o sm'></i></Button>
                </td>
            </tr>
        );
    });

    return (
        <Container>
        <Row className='confRow'>
            <AddModal />
            <Col>
                <Row className='text-center'>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Member</th>
                                <th>Main Category</th>
                                <th>Sub Category</th>
                                <th>Description</th>
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
