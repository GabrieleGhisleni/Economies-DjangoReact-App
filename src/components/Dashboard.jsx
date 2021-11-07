import axios from "axios";

import React, { useState, Component } from "react";

import { Row, Col, Container } from "reactstrap";
import RecordForm from "./SummaryForm";
import SecondNav from "./NavSecond";
import SummaryChart from "./SummaryChart";

function Dashboard() {
    return (
        <React.Fragment>
            <Container style={{marginTop:"50px"}}>
                <Row>
                    <Col xs="12" lg = '8' className='summaryChart'>
                    <SummaryChart />
                    <hr style={{border:"black 1px dashed", display: "none"}}/>
                    </Col>
                    <Col xs="12" lg='4'>
                        <RecordForm />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default Dashboard;
