import StatsMember from "./StatsMember";
import StatsCategory from "./StatsCategory";
import StatsSubCategory from "./StatsSub";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Col, Container, Input, Label, Row, Table } from "reactstrap";

const Stats = () => {
    const records_o = useSelector((state) => state.members.records);
    const members = useSelector((state) => state.members.members);
    const categories = useSelector((state) => state.members.categories);
    const subcategories = useSelector((state) => state.members.subcategories);

    var records = JSON.parse(JSON.stringify(records_o));

    var date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const [category, setCategory] = useState(null);
    const [firstdate, setFirstdate] = useState(new Date().toJSON().slice(0, 10).replace(/-/g, "-"));
    const [seconddate, setSeconddate] = useState(date.toJSON().slice(0, 10).replace(/-/g, "-"));
    const [shared, setShared] = useState("true");

    const renderdCategories = categories.map((c) => {
        return <option value={c.id}>{c.category_name}</option>;
    });

    var set_category = new Set()
    records.forEach((r) => {
        r.created_at = new Date(r.created_at)
        set_category.add(r.category_associated)
    })


    if (category && category != -1) { records = records.filter((r) => r.category_associated == category) }
    records = records.filter(
        (r) =>
            r.created_at <= new Date(firstdate) &&
            r.created_at >= new Date(seconddate)
    );

    var diff = {};
    var tot = 0;
    if (shared === 'true') {
        members.forEach(m => diff[m.member_name] = 0)
        records.forEach(r => {
            if (r.shared.toString() === "true") {
                diff[members.find(m => m.id == r.made_by).member_name] += r.price
                tot += r.price
                r.made_by = -1
            }
        })
    }

    const MyTable = () => {
        const avg = Math.round(tot / members.length)
        const renderedTable = Object.keys(diff).map(r => {
            let tmp = (avg - diff[r])
            return (
                <tr>
                    <td>{r}</td>
                    <td>{diff[r]}</td>
                    <td>{tmp < 0? 
                    <span style={{color:"green", fontWeight:"800"}}> + {Math.abs(tmp)}</span>: 
                    <span style={{color:"red", fontWeight:"800"}}> - {Math.abs(tmp)}</span>}</td>
                </tr>

            );
        })
        return (
            <Table hover responsive striped >
                <thead>
                    <tr>
                        <th>Member</th>
                        <th>Total</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedTable}
                </tbody>
            </Table>)
    }

   
    return (
        <Container className="dashboard">
            <Row className="text-center">
                <Col>
                    <h2 className="dashboard-title">
                        General Dashboard of all the records
                    </h2>
                </Col>
            </Row>

            <div className="dashboard-form">
                <Row >
                    <Col sm='6' xs='12'>
                        <Row>
                            <Col xs="6" className="dashboard-form-inside">
                                <Label>Filter by category</Label>
                                <Input
                                    name="category"
                                    id="category"
                                    type="select"
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                    className="form-control"
                                >
                                    <option value={-1}> None </option>
                                    {renderdCategories}
                                </Input>
                            </Col>
                            <Col xs="6" className="dashboard-form-inside">
                                <Label>Shared options</Label>
                                <Input
                                    name="category"
                                    id="category"
                                    type="select"
                                    onChange={(e) => setShared(e.target.value)}
                                    value={shared}
                                    className="form-control">
                                    <option value={"true"}> Differentiate </option>
                                    <option value={"false"}> Non Differentiate </option>
                                </Input>
                            </Col>
                            <Col xs="6" className="dashboard-form-inside">
                                <Label>From &nbsp;</Label>
                                <Input
                                    name="category"
                                    id="category"
                                    type="date"
                                    onChange={(e) => setFirstdate(e.target.value)}
                                    value={firstdate}
                                    className="form-control"
                                />
                            </Col>
                            <Col xs="6" className="dashboard-form-inside">
                                <Label> &nbsp; To &nbsp;</Label>
                                <Input
                                    name="category"
                                    id="category"
                                    type="date"
                                    onChange={(e) => setSeconddate(e.target.value)}
                                    value={seconddate}
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs='12' sm='6'>
                    {shared == 'true'? <MyTable />:null}
                    </Col>

                </Row>
  
            </div>
            <Row className="chart-row">
                <Col  xs="12"      md="6"  style={{ marginBottom: window.innerHeight < 900 ? "50px" : "30px" }}>
                    <Row>
                        <Col className="text-center">
                            <h4>Cost divided by Members</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StatsMember records={records} members={members} shared={shared} />
                        </Col>
                    </Row>
                </Col>
                {window.innerHeight < 900 ? <hr/>:null}
                <Col  xs="12"    md="6"   style={{ marginBottom: window.innerHeight < 900 ? "50px" : "30px" }}>
                    <Row>
                        <Col className="text-center">
                            <h4>Cost divided by Categories</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StatsCategory records={records} categories={categories} checkset={set_category} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: window.innerHeight < 700 ? "15px 0" : "30px 0" }}>
                <Col xs="12" className="text-center">
                    <hr />
                    <h4>Cost divided by subcategories</h4>
                    <hr />
                    <Row>
                        <Col>
                        
                        <StatsSubCategory
                        records={records}
                        categories={categories}
                        subcategories={subcategories}
                    />                        
                    </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    );
};

export default Stats;
