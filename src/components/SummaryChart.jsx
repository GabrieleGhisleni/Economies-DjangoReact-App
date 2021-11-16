import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import {
    Cell,
    Label,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import {COLORS} from './colors.js'


const SummaryChart = () => {
    const categories_o = useSelector((state) => state.members.categories);
    const records_o = useSelector((state) => state.members.records);

    const records = JSON.parse(JSON.stringify(records_o))
    const categories = JSON.parse(JSON.stringify(categories_o))

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const myRecord = {};
    console.log('records', records)
    console.log('categories', categories)
    records.forEach((r) => {
        
        let date = new Date(r.created_at)
        if ((date.getFullYear() == year) & (date.getMonth() == month)) {
            let price = r.price;
            let cat = r.category_associated;
            if (cat) {
                cat = categories.find((c) => c.id == r.category_associated).category_name;
            }
            if (!(cat in myRecord)) {
                myRecord[cat] = price;
            } else {
                myRecord[cat] += price;
            }
        }
    });

    var cell_color = [];
    var data = [];
    var tot = 0;

    const keys = Object.keys(myRecord);
    for (let i = 0; i < keys.length; i++) {
        data.push({ name: keys[i], value: myRecord[keys[i]] });
        tot += myRecord[keys[i]];
        cell_color.push(<Cell key={`cell-${i}`} fill={COLORS[i]} />);
    }

    var label = true
    if (data.length === 0) { data = [{ name: `No Records in ${month}`, value: .01 }]; label = false }

    function dealerPlus(val) {
        if (val === 12) { setYear(year + 1); return 0 }
        return val
    }

    function dealerMinus(val) {
        if (val === -1) { setYear(year - 1); return 11 }
        return val
    }


    return (
        <React.Fragment>
            <Row className="text-center">
                <Col>
                    <h4>Monthly summary of all members</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ResponsiveContainer width="99%" aspect={1.5}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                fill="#8884d8"
                                startAngle={0}
                                endAngle={360}
                                innerRadius={window.innerWidth < 500 ? 40 : 110}
                                paddingAngle={1}
                                label={window.innerWidth < 500 ? false : label}
                            >
                                {cell_color}
                                <Label width={30} position="center">
                                    {`Tot ${tot}`}
                                </Label>
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    border: "4px solid royalblue",
                                    backgroundColor: "peachpuff",
                                }}
                            />
                            {window.innerWidth < 500 ?
                                <Legend
                                    margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                                    layout='horizontal' align='center' verticalAlign='bottom' iconSize={3} /> :
                                <Legend
                                    layout="vertical"
                                    align="left"
                                    verticalAlign="middle"
                                    iconSize={20} />}
                        
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    <Button
                        onClick={() => setMonth(dealerMinus(month - 1))}
                        className="monthButton notCentral"
                    >
                        {" "}
                        {month === 0 ? months[11] : months[month - 1]}{" "}
                    </Button>
                    <Button onClick={() => setMonth((month))} className="monthButton">
                        {" "}
                        {months[month]}{" "}
                    </Button>
                    <Button
                        onClick={() => setMonth(dealerPlus((month + 1)))}
                        className="monthButton notCentral"
                    >
                        {month === 11 ? months[0] : months[month + 1]}
                    </Button>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SummaryChart;
