import { Container, Row, Col, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS, SHORT_MONTH } from './colors.js'

const StatsCategory = () => {
    const records = useSelector(state => state.members.records)
    const categories = useSelector(state => state.members.categories)

    const unique_month = new Set()
    records.forEach(r => unique_month.add(new Date(r.created_at).getMonth()))

    const unique_category = {};
    categories.forEach(m => unique_category[m.id] = m.category_name)

    const categoryCost = {};
    for (let month of unique_month.keys()) categoryCost[month] = {};
    records.forEach(r => {
        let month = new Date(r.created_at).getMonth()
        if (unique_category[r.category_associated] in categoryCost[month]) { categoryCost[month][unique_category[r.category_associated]] += r.price }
        else { categoryCost[month][unique_category[r.category_associated]] = r.price }
    })

    const dataCategory = [];
    Object.keys(categoryCost).forEach(k => {
        let tmp = { month: SHORT_MONTH[k] }
        Object.keys(categoryCost[k]).forEach(m => { tmp[m] = categoryCost[k][m] })
        dataCategory.push(tmp)
    })

    var i = 0;
    const colorCategory = [];
    Object.keys(unique_category).forEach(m => { colorCategory.push(<Bar dataKey={unique_category[m]} stackId='a' fill={COLORS[i]} />); i++ })
    return (
        
        <ResponsiveContainer width="99%" aspect={1.5}>
            <BarChart
                width={500}
                height={300}
                data={dataCategory}
                margin= {{
                    top: 5,
                    right: 20,
                    left: 0,
                    bottom: 20
                  }}
            >
                <CartesianGrid />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {colorCategory}
                <Legend position='right'/>
            </BarChart>
        </ResponsiveContainer>
    )
}


export default StatsCategory;