import React from "react";
import { Label, Col, Row, Button, FormGroup, Input, Form } from "reactstrap";
import { ErrorMessage, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as axios from 'axios';
import memberSlice from "../features/memberSlice";
import { NavLink } from 'react-router-dom';

const RecordForm = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token);
  const members = useSelector((state) => state.members.members);
  const headers = { "Authorization": `Bearer ${token}` }
  const categories = useSelector((state) => state.members.categories);
  const subCategories = useSelector((state) => state.members.subcategories);

  const formik = useFormik({
    initialValues: {
      title: null,
      price: null,
      member: members[0].id,
      category: categories[0].id,
      sub_category: null,
      description: null,
      date: new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    },
    onSubmit: (values, { resetForm }) => {
      console.log('values formik', values)
      resetForm({})
      if (values.sub_category === -1) { values.sub_category = null }
      addRecord(
        values.title,
        values.price,
        values.member,
        values.category,
        values.sub_category,
        values.description,
        values.date
      );
    },
    validateOnChange: false,
    validateOnBlur: false
  });

  function addRecord(title, price, member, main_cat, sub_cat, description, date) {
    var axios = require('axios');
    var config = {
      method: 'post', url: 'http://localhost:8000/api/records/', headers: headers,
      data: {
        record_name: title,
        price: price,
        made_by: member,
        category_associated: main_cat,
        sub_category_associated: sub_cat,
        description: description,
        created_at: date,
      }
    };

    axios(config)
      .then((res) => { dispatch(memberSlice.actions.addRecords(res.data)) })
      .catch(e => console.log('Error while adding record', { e }))
  }

  const renderdCategories = categories.map(c => { return <option value={c.id}>{c.category_name}</option> })
  const selectedSub = subCategories.filter(sb => sb.primary_category == formik.values.category)
  const renderedSubCategories = selectedSub.map((m) => { return <option value={m.id}>{m.sub_category_name}</option> });
  const renderedMembers = members.map((m) => { return <option value={m.id}>{m.member_name}</option> });

  return (
    <React.Fragment>
      <Form onSubmit={formik.handleSubmit}>
        <h3 style={{ textAlign: "center", paddingBottom: "20px" }}>Add records</h3>
        <FormGroup>
          <Row className="align-items-center">
            <Col xs="4">
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
            <Col xs='auto'>
              <NavLink to='/configurations'>
                <Col xs='auto'>
                  <i className='fa fa-plus fa-lg Plus'> add</i>
                </Col>
              </NavLink>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="4" className="align-items-center">
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
                placeholder="Title"
              />
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
                name="price"
                id="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                placeholder="Price"
                required
              />
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
                name="category"
                id="category"
                type="select"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.values.sub_category = -1;
                }}
                value={formik.values.category}
                className='form-control'
                required
              >
                {renderdCategories}
              </Input>
            </Col>
            <Col xs='auto'>
              <NavLink to='/configurations'>
                <Col xs='auto'>
                  <i className='fa fa-plus fa-lg Plus'> add</i>
                </Col>
              </NavLink>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="4" className="align-items-center">
              <Label>Sub category</Label>
            </Col>
            <Col>
              <Input
                name="sub_category"
                id="sub_category"
                type="select"
                onChange={(e) => { formik.handleChange(e); }}
                value={formik.values.sub_category}
                className='form-control'
              >
                <option value={""}> None </option>
                {renderedSubCategories}
              </Input>
            </Col>
            <Col xs='auto'>
              <NavLink to='/configurations'>
                <Col xs='auto'>
                  <i className='fa fa-plus fa-lg Plus'> add</i>
                </Col>
              </NavLink>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="4">
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
        <Row className="text-center">
          <Col xs={12}>
            <Button type="submit" className='subButton' color='primary'>
              Save new record
            </Button>
            <Button type="reset" className='subButton' color='secondary'>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default RecordForm;
