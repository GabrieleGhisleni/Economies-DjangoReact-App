import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, Component } from 'react'
import { memberSlice } from './../features/memberSlice'
import { Row, Col, Container } from 'reactstrap'
import RecordForm from './RecordForm'
import SecondNav from "./SecondNav"






function Dashboard() {
    const members = useSelector(state => state.members.members)
    const records = useSelector(state => state.members.records)
    const categories = useSelector(state => state.members.categories)
    const subcategories = useSelector(state => state.members.subcategories)
    return (<React.Fragment>
        <Container>
            <Row>
                <Col className='recordForm' xs='auto'>
                    <RecordForm members={members} />
                </Col>
                <Col style={{ border: "2px black solid" }}>
            
                </Col>
            </Row>
            m{JSON.stringify(members)}<br /><br />
            r{JSON.stringify(records)}<br /><br />
            r{JSON.stringify(categories)}<br /><br />
            r{JSON.stringify(subcategories)}<br /><br />
        </Container>
    </React.Fragment>


    )
}

export default Dashboard;