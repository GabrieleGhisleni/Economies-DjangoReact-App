import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, FormGroup, Table, Label, Input, Form, Row, Col, Container } from "reactstrap";
import axios from "axios";
import memberSlice from "../features/memberSlice";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import RecordFormUpdate from './RecordFormUpdate'

const History = () => {
    const records = useSelector((state) => state.members.records);
    const members = useSelector((state) => state.members.members);
    const categories = useSelector((state) => state.members.categories);

    const token = useSelector((state) => state.auth.token);
    const [modal, openModal] = useState(false)
    const [id, setId] = useState(null)

    const dispatch = useDispatch();

    const deleteRecord = (id) => {
        let url = "http://127.0.0.1:8000/api/records/";
        const headers = { Authorization: `Bearer ${token}` };
        axios
            .delete(url, { headers, data: { id: id } })
            .then((res) => {dispatch(memberSlice.actions.removeRecords(id))})
            .catch((e) => console.log({ e }));
    };

    const updateRecord = (id) => { openModal(!modal); setId(id) };

    let i = 0;
    const renderedRecords = records.map((r) => {
        const catNames = r.category_associated.map(n => categories.find(u => u.id === n).category_name)
        const membNames = members.find(u => u.id === r.made_by).member_name
        i++;
        return (
            <tr>
                <Modal isOpen={modal} toggle={() => openModal(!modal)}>
                    <ModalHeader close={<button className="close" onClick={() => openModal(!modal)}>×</button>}>Modify Records</ModalHeader>
                    <ModalBody>
                        <RecordFormUpdate props={{ record: records.filter((record) => record.id == id), i: i }} />
                    </ModalBody>
                </Modal>
                <th>{i}</th>
                <td>{r.record_name}</td>
                <td>{r.price}</td>
                <td>{membNames}</td>
                <td>{catNames}</td>
                <td>{r.created_at}</td>
                <td>
                    <Button color="primary" onClick={() => updateRecord(r.id)}><i className='fa fa-refresh'></i></Button>
                    <Button color="danger" onClick={() => deleteRecord(r.id)}><i className='fa fa-trash-o sm'></i></Button>
                </td>
            </tr>
        );
    });

    return (
        <React.Fragment>
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Member</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{renderedRecords}</tbody>
            </Table>
        </React.Fragment>
    );
};

export default History;
