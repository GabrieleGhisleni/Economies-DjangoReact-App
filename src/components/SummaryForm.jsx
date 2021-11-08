import React, {useState} from "react";
import { Label, Col, Row, Button, FormGroup, Input, Form } from "reactstrap";
import { useFormik } from "formik";
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
  const [alert, setAlert] = useState(false)
  const [redAlert, setRedAlert] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      member: members[0]? members[0].id:null,
      category: categories[0]? categories[0].id:null,
      sub_category: null,
      description: "",
      date: new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    },
    onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
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
      resetForm({})
      setStatus({success: true})
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
      .then((res) => { 
        dispatch(memberSlice.actions.addRecords(res.data))
        setAlert(true)
        setTimeout(()=> setAlert(false), 5000) })
      .catch((e ) => {
        setRedAlert(true)
        setTimeout(()=> setRedAlert(false), 5000) 
        let err = {e}
        try {if (err.e.response.data.forbidden.includes("exceeded")) alert('Max Members Exceeded')}
        catch{}})}

  const renderdCategories = categories.map(c => { return <option value={c.id}>{c.category_name}</option> })
  const selectedSub = subCategories.filter(sb => sb.primary_category == formik.values.category)
  const renderedSubCategories = selectedSub.map((m) => { return <option value={m.id}>{m.sub_category_name}</option> });
  const renderedMembers = members.map((m) => { return <option value={m.id}>{m.member_name}</option> });
  
  const alertClass = alert?  "block": "none"
  const redClass = redAlert?  "block": "none"
  const alertButton = "rgba(154, 255, 154,0.6)"
  const alertRedButton = "rgba(126, 25, 25,0.7)"
  var c;
  if (redAlert){c = alertRedButton}
  else if (alert){c = alertButton }
  else{c = 'white'}
  

  return (
    <React.Fragment>
      <Form onSubmit={formik.handleSubmit} style={{backgroundColor:c, padding:"5px"}}>
        <h4 style={{ textAlign: "center", paddingBottom: "20px" }}>New records</h4>
        <FormGroup>
          <Row className="align-items-center">
            <Col>
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
                {members[0]? <div></div>:  <option value={-1}> None </option>}
                {renderedMembers}
              </Input>
            </Col>
            <Col className='plusSign' xs='auto'>
              <NavLink to='/configurations#member'>
                  <i className='fa fa-plus fa-lg'></i>
              </NavLink>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
        <Row className="align-items-center">
              <Col>
              <Label>Title</Label>
            </Col>
            <Col xs='auto'>
              <Input
                name="title"
                id="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                required
                placeholder="Dai un Titolo"
              />
            </Col>
    
          </Row>
        </FormGroup>
        <FormGroup>
        <Row className="align-items-center">
            <Col>
              <Label>Price</Label>
            </Col>
            <Col xs='auto'>
              <Input
                name="price"
                id="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                placeholder="Dai un Prezzo"
                required
              />
            </Col>
       
          </Row>
        </FormGroup>
        <FormGroup>
        <Row className="align-items-center">
            <Col >
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
            
            <Col  className='plusSign' xs='auto'>
              <NavLink to='/configurations#category'>
           
                  <i className='fa fa-plus fa-lg'></i>
         
              </NavLink>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
        <Row className="align-items-center">
            <Col  >
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
            <Col  className='plusSign' xs='auto'>
              <NavLink to='/configurations#subcategory'>
             
                  <i className='fa fa-plus fa-lg'></i>
            
              </NavLink>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
        <Row className="align-items-center">
            <Col >
              <Label>Date</Label>
            </Col>
            <Col xs='auto'>
              <Input
                name="date"
                id="date"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.date}
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
              placeholder="Dai una Descrizione"
            />
          </Col>
        </FormGroup>
        <Row className="text-center">
          <Col xs={12} style={{paddingBottom:"20px"}}>
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
