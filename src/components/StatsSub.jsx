import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { COLORS, SECOND_COLORS } from './colors.js'

const StatsSubCategory = (data) => {
    const records_c = data.records
    const subcategories = data.subcategories
    const categories = data.categories
    const unique_subcategories = {};
    const unique_category = {};

    subcategories.forEach(m => unique_subcategories[m.id] = m.sub_category_name)
    categories.forEach(m => unique_category[m.id] = m.category_name)

    const dataSub = {};
    const dataCate = {};
    var records = [...records_c]
    records.sort(function (a, b) { return a.category_associated - b.category_associated; })
    records.forEach(r => {
        if (unique_category[r.category_associated] in dataCate) { dataCate[unique_category[r.category_associated]] += r.price }
        else { dataCate[unique_category[r.category_associated]] = r.price }
        if (unique_category[r.category_associated] in dataSub) {
            if (r.sub_category_associated) {
                if (unique_subcategories[r.sub_category_associated] in dataSub[unique_category[r.category_associated]]) {
                    dataSub[unique_category[r.category_associated]][unique_subcategories[r.sub_category_associated]] += r.price
                }
                else { dataSub[unique_category[r.category_associated]][unique_subcategories[r.sub_category_associated]] = r.price }
            }
            else {
                if ('generico' in dataSub[unique_category[r.category_associated]]) {
                    dataSub[unique_category[r.category_associated]][`generico-${unique_category[r.category_associated]}`] += r.price
                }
                else { dataSub[unique_category[r.category_associated]][`generico-${unique_category[r.category_associated]}`] = r.price }
            }
        } else {
            dataSub[unique_category[r.category_associated]] = {}
            if (r.sub_category_associated) {
                if (unique_subcategories[r.sub_category_associated] in dataSub[unique_category[r.category_associated]]) {
                    dataSub[unique_category[r.category_associated]][unique_subcategories[r.sub_category_associated]] += r.price
                }
                else { dataSub[unique_category[r.category_associated]][unique_subcategories[r.sub_category_associated]] = r.price }
            }
            else {
                if ('generico' in dataSub[unique_category[r.category_associated]]) {
                    dataSub[unique_category[r.category_associated]][`generico-${unique_category[r.category_associated]}`] += r.price
                }
                else { dataSub[unique_category[r.category_associated]][`generico-${unique_category[r.category_associated]}`] = r.price }
            }
        }
    })

    var dataMain = []
    var main_color = [];
    var dataSec = []
    var sec_color = [];

    let i = 0
    let j = 0


    Object.keys(dataCate).forEach(k => {
        dataMain.push({ name: k, value: dataCate[k] })
        main_color.push(<Cell key={`cell-${i}`} fill={COLORS[i]} />);
        i++
        Object.keys(dataSub[k]).forEach(kk => {
            dataSec.push({ name: kk, value: dataSub[k][kk] })
    
            sec_color.push(<Cell key={`cell-${j}`} fill={SECOND_COLORS[j]} />);
            j++

        })
    })


    var rateo = 2.5
    if (window.innerWidth < 2000) { rateo=2}
    if (window.innerWidth < 1000) { rateo=1.5}
    if (window.innerWidth < 900) { rateo=1.2}
    if (window.innerWidth < 800) { rateo=1}
    if (window.innerWidth < 600) { rateo=0.9}
    if (window.innerWidth < 500) { rateo=0.8}
    if (window.innerWidth < 450) { rateo=0.6}

    return (
        <ResponsiveContainer width="99%" aspect={rateo}>
            <PieChart>
                {/* <Pie data={dataMain} dataKey="value"
                paddingAngle={1}
                 outerRadius={120}
                 fill="#8884d8" >

                </Pie> */}
                <Pie data={dataSec} 
                paddingAngle={1}
                dataKey="value" 
                innerRadius={125}
                 outerRadius={170} 
                 fill="#82ca9d" label >
                {sec_color}
                </Pie>
                <Tooltip
                    contentStyle={{
                        border: "4px solid royalblue",
                        backgroundColor: "peachpuff",
                    }}
                />
                
                    <Legend
                        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        layout='horizontal' align='center' verticalAlign='bottom' iconSize={10} /> 
            </PieChart>
        </ResponsiveContainer>
    )
}


export default StatsSubCategory;