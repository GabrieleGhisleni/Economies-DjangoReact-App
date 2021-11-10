import React from "react";
import { Row, Col, Container } from "reactstrap";
import RecordForm from "./SummaryForm";
import SummaryChart from "./SummaryChart";

import {fetcher} from "./axios_refresh";
import useSWR from 'swr';

function Dashboard() {
    useSWR('/api/members/', fetcher)
    return (
        <React.Fragment>
            <Container className='home-container'>
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
