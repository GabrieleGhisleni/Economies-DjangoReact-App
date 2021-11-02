import React, { Component } from "react";
import { Label, Col, Row, Button, FormGroup, Input, Form } from "reactstrap";
import { ErrorMessage, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import memberSlice from "../features/memberSlice";

const RecordFormUpdate = ({props}) => {

  const dispatch = useDispatch()
  const members = useSelector((state) => state.members.members);
  const token = useSelector((state) => state.auth.token);
  const record = props.record[0]

  const addRecord = (member, title, price, date, description) => {
    let url = "http://localhost:8000/api/records/";
    const headers = { Authorization: `Bearer ${token}` }
    const body = { name: title, made_by: member, price: price, date: date }
    axios
      .post(url, body, {headers})
      .then((res) => {dispatch(memberSlice.actions.addRecords(res.data))})
      .catch((e) => console.log({e}));
  };
  console.log(members)
  const renderedMembers = members.map((m) => {
    return <option value={m.id}>{m.member_name}</option>;
  });

  const formik = useFormik({
    initialValues: {
      member: record.made_by,
      title: record.record_name,
      price: record.price,
      date:  record.created_at,
      description: record.date,
      category: record.category,
    },
    onSubmit: (values, { resetForm }) => {
      addRecord(
        values.member,
        values.title,
        values.price,
        values.date,
        values.description
      );
      resetForm()
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <React.Fragment>
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Row>
            <Col xs="3">
              <Label htmlFor="members">Member</Label>
            </Col>
            <Col>
            <Input
              type="select"
              name="member"
              id="member"
              value={formik.values.member}
              onChange={formik.handleChange}
              className='form-control'
            >
              {renderedMembers}
            </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="3" className="align-items-center">
              <Label>Title</Label>
            </Col>
            <Col>
              <Input
                name="title"
                id="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                required
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="3" className="align-items-center">
              <Label>Price</Label>
            </Col>
            <Col>
              <Input
                name="price"
                id="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                placeholder="price"
                required
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="3" className="align-items-center">
              <Label>Category</Label>
            </Col>
            <Col>
              <Input
                name="price"
                id="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                placeholder="price"
                required
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="3">
              <Label>Date</Label>
            </Col>

            <Col>
              <Input
                name="date"
                id="date"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.date}
                placeholder={formik.values.date}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Col>
            <Label>Description</Label>
          </Col>
          <Col>
            <Input
              name="description"
              id="description"
              type="textarea"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Col>
        </FormGroup>
        <Row className="ml-auto">
          <Col xs="auto">
            <Button type="submit" className="primary bg-primary">
              Submit
            </Button>
          </Col>
          <Col xs="auto">
            <Button className="primary bg-secondary ">Cancel</Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};
export default RecordFormUpdate;
