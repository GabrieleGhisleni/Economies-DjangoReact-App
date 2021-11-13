import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList} from 'recharts';
import { COLORS, SHORT_MONTH } from './colors.js'

const StatsMember = (data) => {
    const records = data.records
    const members = data.members
    const shared = data.shared
    const unique_month = new Set()
    records.forEach(r => unique_month.add(new Date(r.created_at).getMonth()))

    const unique_member = {};
    if (shared=='true') unique_member["-1"] = 'shared'
    members.forEach(m => unique_member[m.id] = m.member_name)

    const memberCost = {};
    for (let month of unique_month.keys()) memberCost[month] = { tot: 0 };
    records.forEach(r => {
        let month = new Date(r.created_at).getMonth()
        if (unique_member[r.made_by] in memberCost[month]) { memberCost[month][unique_member[r.made_by]] += r.price }
        else { memberCost[month][unique_member[r.made_by]] = r.price }
        memberCost[month].tot += r.price

    })

    const dataMember = [];
    Object.keys(memberCost).forEach(k => {
        let tmp = { month: SHORT_MONTH[k] }
        Object.keys(memberCost[k]).forEach(m => { tmp[m] = memberCost[k][m] })
        dataMember.push(tmp)
    })

    var i = 0;
    const colorBar = [];
    Object.keys(unique_member).forEach(m => { colorBar.push(<Bar dataKey={unique_member[m]} fill={COLORS[i]}><LabelList dataKey={unique_member[m]} position="top" /></Bar>); i++ })
    const max = Math.max.apply(Math, dataMember.map(function(o) { return o.tot; }))
    return (
        <ResponsiveContainer width="99%" aspect={1}>
            <BarChart
                width={500}
                height={300}
                data={dataMember}>
                <CartesianGrid />
                <XAxis dataKey="month" />
                <YAxis domain={[0, max+20]} tickCount={10}/>
                <Tooltip />
                <Legend  wrapperStyle={{ position: 'relative' }}/>
                {colorBar}
            </BarChart>
        </ResponsiveContainer>
    )
}


export default StatsMember;