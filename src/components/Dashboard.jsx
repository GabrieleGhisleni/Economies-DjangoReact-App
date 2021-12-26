import React from "react";
import { Row, Col, Container } from "reactstrap";
import RecordForm from "./SummaryForm";
import SummaryChart from "./SummaryChart";
import calculateWith from "./container_width";
import {fetcher} from "./axios_refresh";
import useSWR from 'swr';

function Dashboard() {
    useSWR('/api/members/', fetcher);
    let myWidth = calculateWith(window.innerWidth);
    return (
        <React.Fragment>
            <Container fluid style={{width: myWidth}}>
                <Row className='align-items-center home-container'>
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
