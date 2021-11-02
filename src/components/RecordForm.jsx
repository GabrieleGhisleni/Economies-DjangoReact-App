import React, { Component } from "react";
import { Label, Col, Row, Button, FormGroup, Input, Form } from "reactstrap";
import { ErrorMessage, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import memberSlice from "../features/memberSlice";

const RecordForm = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token);
  const members = useSelector((state) => state.members.members);
  const categories = useSelector((state) => state.members.categories);

  const addRecord = (member, title, price, date, cat, description) => {
    let url = "http://localhost:8000/api/records/";
    const headers = { Authorization: `Bearer ${token}` }
    const body = { record_name: title, made_by: member, price: price, created_at: date, category_associated: [cat] }
    axios
      .post(url, body, {headers})
      .then((res) => {dispatch(memberSlice.actions.addRecords(res.data))})
      .catch((e) => console.log({e}));
  };

  const renderdCategories= categories.map(c =>{return <option value={c.id}>{c.category_name}</option>})
  const renderedMembers = members.map((m) => {return <option value={m.id}>{m.member_name}</option>});
    const formik = useFormik({
    initialValues: {
      member: members[0].id,
      title: "",
      category: categories[0].id,
      price: "Prezzo",
      date:  new Date().toJSON().slice(0,10).replace(/-/g,'-'),
      description: "",
    },
    onSubmit: (values, { resetForm }) => {
      addRecord(
        values.member,
        values.title,
        values.price,
        values.date,
        values.category,
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
        <h3 style={{textAlign:"center", paddingBottom:"20px"}}>Add records</h3>
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
            <Col>
            <Button>
                Add Member
            </Button>
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
                name="category"
                id="category"
                type="select"
                onChange={formik.handleChange}
                value={formik.values.category}
                className='form-control'
                required
              >
                {renderdCategories}
              </Input>
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
export default RecordForm;
