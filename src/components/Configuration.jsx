import React, { useState } from 'react';
import { Col, Row, Container, Table, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useSelector } from 'react-redux';

const Configurations = () => {
    const members = useSelector(state => state.members.members)
    const categories = useSelector(state => state.members.categories)
    const subcategories = useSelector(state => state.members.subcategories)
    const [modal, openModal] = useState(false)

    let i = 0;
    const membersRendered = members.map((r) => {
        i++;
        return (
            <tr>
                <Modal isOpen={modal} toggle={() => openModal(!modal)}>
                    <ModalHeader close={<button className="close" onClick={() => openModal(!modal)}>×</button>}>Modify</ModalHeader>
                    <ModalBody>
                        <div>to update</div>
                    </ModalBody>
                </Modal>
                <th>{i}</th>
                <td>{r.member_name}</td>
                <td>
                    <Button color="primary" ><i className='fa fa-refresh'></i></Button>
                    <Button color="danger" ><i className='fa fa-trash-o sm'></i></Button>
                </td>
            </tr>
        );
    });

    i = 0;
    const categoryRendered = categories.map((r) => {
        i++;
        return (
            <tr>
                <Modal isOpen={modal} toggle={() => openModal(!modal)}>
                    <ModalHeader close={<button className="close" onClick={() => openModal(!modal)}>×</button>}>Modify</ModalHeader>
                    <ModalBody>
                        <div>to update</div>
                    </ModalBody>
                </Modal>
                <th>{i}</th>
                <td>{r.category_name}</td>
                <td>
                    <Button color="primary" ><i className='fa fa-refresh'></i></Button>
                    <Button color="danger" ><i className='fa fa-trash-o sm'></i></Button>
                </td>
            </tr>
        );
    });

    i = 0;
    const subcategoryRendered = subcategories.map((r) => {
        i++;
        console.log(r)
        return (
            <tr>
                <Modal isOpen={modal} toggle={() => openModal(!modal)}>
                    <ModalHeader close={<button className="close" onClick={() => openModal(!modal)}>×</button>}>Modify</ModalHeader>
                    <ModalBody>
                        <div>to update</div>
                    </ModalBody>
                </Modal>
                <th>{i}</th>
                <td>{r.sub_category_name}</td>
                <td>{categories.find(c => c.id == r.primary_category).category_name}</td>
                <td>
                    <Button color="primary" ><i className='fa fa-refresh'></i></Button>
                    <Button color="danger" ><i className='fa fa-trash-o sm'></i></Button>
                </td>
            </tr>
        );
    });


    return (
        <React.Fragment>
            <Container id="members">
                <Row className='confRow'>
                    <Col>
                        <Row>
                            <Col xs='auto'>
                                <h2>Member</h2>
                            </Col>
                            <Col>
                                <Button color='success'>Add Member</Button>
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
                                <tbody></tbody>
                                {membersRendered}
                            </Table>
                        </Row>
                    </Col>
                </Row>
                <Row className='confRow'>
                    <Col id="categories">
                        <Row>
                            <Col xs='auto'>
                                <h2>Category</h2>
                            </Col>
                            <Col>
                                <Button color='success'>Add category</Button>
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
                            <tbody></tbody>
                            {categoryRendered}

                        </Table>

                    </Row>
                    </Col>
                </Row>
                <Row className='confRow'>
                    <Col id="subcategories">
                        <Row>
                            <Col xs='auto'>
                                <h2>Subcategory</h2>
                            </Col>
                            <Col>
                                <Button color='success'>Add subcategory</Button>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Under</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                                {subcategoryRendered}
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Configurations;