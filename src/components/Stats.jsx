import { Container, Row, Col, Button } from 'reactstrap';
import StatsMember from './StatsMember';
import StatsCategory from './StatsCategory';
import StatsSubCategory from './StatsSub';

const Stats = () => {
    return (
        <Container >
            <Row>
                <Col>
                <p>General Dashboard of all the records</p>
                </Col>
            </Row>
            <Row >
                <Col xs='12' md='6' style={{marginBottom: window.innerHeight<700? "15px": "30px"}}>
                    <Row>
                        <Col className='text-center'>
                    <h4>Cost divided by Members</h4>
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                    <StatsMember />
                    </Col>
                    </Row>
                </Col>
                <Col xs='12' md='6' style={{marginBottom: window.innerHeight<700? "15px": "30px"}}>
                <Row>
                        <Col className='text-center'>
                    <h4>Cost divided by Members</h4>
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                    <StatsCategory />
                    </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{margin: window.innerHeight<700? "15px 0": "30px 0"} }>
                <Col xs='12' md='12' className='text-center'>
                    <hr/>
                <h4>Cost divided by subcategories</h4>
                <hr/>
                <StatsSubCategory/>
                </Col>
            </Row>
        </Container>
    )
}

export default Stats;