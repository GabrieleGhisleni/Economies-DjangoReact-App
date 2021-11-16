import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { memberSlice } from './../features/memberSlice'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import toast, { Toaster } from 'react-hot-toast';

const RenderdCategory = () => {

    var axios = require("axios")
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const headers = { Authorization: `Bearer ${token}` }
    const BASE_URL = useSelector(state => state.members.base_url)
    const url = `${BASE_URL}/api/category/`
    const [type, setType] = useState("delete")
    const [addModalC, setaddModalC] = useState(false)


    const AddModalS = () => {
        const formik = useFormik({
            initialValues: { category_name: "", save: -1 },
            onSubmit: (values, { resetForm }) => {
                values.category_name = values.category_name.charAt(0).toUpperCase() + values.category_name.slice(1);
                setaddModalC(!addModalC)
                switch (type) {
                    case "add":
                        addCategory(values.category_name);
                        break;
                    case "delete":
                        deleteCategory(current.id, values.save);
                        break;
                    default:
                        modifyCategory(current.id, values.category_name);
                        break;
                }
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
            .then(res=>{ 
                dispatch(memberSlice.actions.addCat(res.data)) 
                toast.success('Successfully created!', { duration: 4000, position: 'top-center',})})
            .catch(e => {
                toast.error('Something went wrong!', {duration: 4000, position: 'top-center',})
                let err = {e}
                try {if (err.e.response.data.forbidden.includes("exceeded")) alert('Max Category Exceeded')}
                catch{}
            })
        }

        function deleteCategory(id, save) {
            var config = {
                method: 'delete',
                url: url,
                headers: headers,
                data: { id: id }
            };
            axios(config)
             .then(() => {dispatch(memberSlice.actions.removeCat({values: current.id, save}))
                toast.success('Successfully delete!', { duration: 4000, position: 'top-center',})})
                .catch(e =>  toast.error('Something went wrong!', {duration: 4000, position: 'top-center',})({ e })) //console.log
        }


        function modifyCategory(id, new_name) {
            var config = {
                method: 'put',
                url: url,
                headers: headers,
                data: { id: id, category_name: new_name }
            };
            axios(config)
            .then((values) =>{dispatch(memberSlice.actions.updateCat({values}))
            toast.success('Successfully updated!', { duration: 4000, position: 'top-center',})})
            .catch(e =>  toast.error('Something went wrong!', {duration: 4000, position: 'top-center',})({ e })) //console.log
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
                                        <span>
                                        Eliminating the category means that all the records associated
                                        with it will be delated, do you want to assign the records to another 
                                        category and save them?
                                        </span>
                                            <Col xs={12}>
                                                <Input
                                                    className='form-control'
                                                    name="save"
                                                    id="save"
                                                    type="select"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.save}>
                                                    <option value={-1}>No, delete all the records</option>
                                                    {renderdCategories_list}
                                                </Input>
                                            </Col>
                                    </Col>
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
    const renderdCategories_list = categories.map(c => {return <option key={c.id} value={c.id}>{c.category_name}</option>})
    const [current, setCurrent] = useState({})
    // if (current.lenght > 0) {setCurrent(current[0])}


    let i = 0;
    const categoriesRendered = categories.map((r) => {
        i++;
        return (
            <tr key={r.id}>
                <td>{i}</td>
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
            < Toaster/>
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
