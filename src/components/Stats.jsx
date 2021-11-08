import StatsMember from './StatsMember';
import StatsCategory from './StatsCategory';
import StatsSubCategory from './StatsSub';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
    Col, Container, Input, Label, Row
} from 'reactstrap';

const Stats = () => {
    const records_o = useSelector(state => state.members.records)
    const members = useSelector(state => state.members.members)
    const categories = useSelector(state => state.members.categories)
    const subcategories = useSelector(state => state.members.subcategories)

    var records = JSON.parse(JSON.stringify(records_o))

    var date = new Date(); date.setFullYear(date.getFullYear() - 1);
    const [category, setCategory] = useState(null)
    const [firstdate, setFirstdate] = useState(new Date().toJSON().slice(0, 10).replace(/-/g, '-'))
    const [seconddate, setSeconddate] = useState(date.toJSON().slice(0, 10).replace(/-/g, '-'))

    const renderdCategories = categories.map(c => { return <option value={c.id}>{c.category_name}</option> })
    records.forEach(r => r.created_at = new Date(r.created_at))
    if (category) records = records.filter(r => r.category_associated == (category))
    records = records.filter(r => (r.created_at <= new Date(firstdate) && r.created_at >= new Date(seconddate)))

    return (
        <Container className='dashboard'>
            <Row className='text-center'><Col><h2 className='dashboard-title'>General Dashboard of all the records</h2></Col></Row>
            <Row className='dashboard-form'>
                <Col xs='12' sm='4' className='dashboard-form-inside'>
                    <Label>Filter by category &nbsp;</Label>
                    <Input
                        name="category" id="category" type="select"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category} className='form-control'>
                        <option value={-1}> None </option>
                        {renderdCategories}
                    </Input>
                </Col>
                <Col xs='6' sm='4' className='dashboard-form-inside'>
                    <Label>From &nbsp;</Label>
                    <Input
                        name="category" id="category" type="date"
                        onChange={(e) => setFirstdate(e.target.value)}
                        value={firstdate} className='form-control' />
                </Col>
                <Col xs='6' sm='4' className='dashboard-form-inside'>
                    <Label> &nbsp; To &nbsp;</Label>
                    <Input
                        name="category" id="category" type="date"
                        onChange={(e) => setSeconddate(e.target.value)}
                        value={seconddate} className='form-control' />

                </Col>
            </Row>
            <Row className='chart-row'>
                <Col xs='12' md='6' style={{ marginBottom: window.innerHeight < 700 ? "15px" : "30px" }}>
                    <Row>
                        <Col className='text-center'>
                            <h4>Cost divided by Members</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StatsMember records={records} members={members} />
                        </Col>
                    </Row>
                </Col>
                <Col xs='12' md='6' style={{ marginBottom: window.innerHeight < 700 ? "15px" : "30px" }}>
                    <Row>
                        <Col className='text-center'>
                            <h4>Cost divided by Categories</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StatsCategory records={records} categories={categories} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ margin: window.innerHeight < 700 ? "15px 0" : "30px 0" }}>
                <Col xs='12' md='12' className='text-center'>
                    <hr />
                    <h4>Cost divided by subcategories</h4>
                    <hr />
                    <StatsSubCategory records={records} categories={categories} subcategories={subcategories} />
                </Col>
            </Row>
        </Container>
    )
}

export default Stats;