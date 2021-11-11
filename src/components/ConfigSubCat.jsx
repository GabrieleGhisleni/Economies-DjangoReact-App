import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { memberSlice } from './../features/memberSlice'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import toast, { Toaster } from 'react-hot-toast';

const RenderdSubCat = () => {
    var axios = require("axios")
    const dispatch = useDispatch()
    const categories = useSelector(state => state.members.categories)

    const token = useSelector(state => state.auth.token)
    const headers = { Authorization: `Bearer ${token}` }
    const BASE_URL = useSelector(state => state.members.base_url)
    const url = `${BASE_URL}/api/sub_category/`    

    const [type, setType] = useState("add")
    const [addModalS, setaddModalS] = useState(false)

    const renderdCategories = categories.map(c => { return <option value={c.id}>{c.category_name}</option> })

    const AddModal = () => {
        const formik = useFormik({
            initialValues: { sub_category_name: current.sub_category_name, 
                primary_category: categories[0]? categories[0].id: '' },
            onSubmit: (values, { resetForm }) => {
                setaddModalS(!addModalS)
                switch (type) {
                    case "add":
                        addCategory(values.sub_category_name, values.primary_category);
                        break;
                    case "delete":
                        deleteCategory(current.id);
                        break;
                    default:
                        modifyCategory(current.id, values.sub_category_name, values.primary_category);
                        break;
                }
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
                .then(res=>{ dispatch(memberSlice.actions.addSub(res.data)) 
                    toast.success('Successfully created!', { duration: 4000, position: 'top-center',})})
                .catch(e => {
                    toast.error('Something went wrong!', {duration: 4000, position: 'top-center',})
                    let err = {e}
                    try {if (err.e.response.data.forbidden.includes("exceeded")) alert('Max Sub Category Exceeded')}
                    catch{}
                })
        }

        function deleteCategory(id) {
            var config = {
                method: 'delete',
                url: url,
                headers: headers,
                data: { id: id }
            };

            axios(config)
                .then(res=>{ 
                    toast.success('Successfully deleted!', { duration: 4000, position: 'top-center',})
                    dispatch(memberSlice.actions.removeSub(current.id)) 
                })
                .catch(e => 
                    toast.error('Something went wrong!', {duration: 4000, position: 'top-center',})
                    ({ e })) //console.log
        }


        function modifyCategory(id, new_name, primary_category) {
            var config = {
                method: 'put',
                url: url,
                headers: headers,
                data: { id: id, sub_category_name: new_name, primary_category_id: primary_category }
            };
            axios(config)
                .then((values) =>{dispatch(memberSlice.actions.updateSub({values}))
                toast.success('Successfully updated!', { duration: 4000, position: 'top-center',})})
                .catch(e => 
                    toast.error('Something went wrong!', {duration: 4000, position: 'top-center',})
                    ) //console.log
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


    let i = 0;
    const subcategoriesRendered = subcategories.map((r) => {
        i++;
        let catname = categories.find(c => c.id == r.primary_category)
        return (
            <tr>
                <th>{i}</th>
                <td>{r.sub_category_name}</td>
                <td>{catname? catname.category_name: "This sub category does not exists anymore"}</td>
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
            < Toaster/>
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
