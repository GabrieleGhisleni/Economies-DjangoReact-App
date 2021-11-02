import { useDispatch } from "react-redux";
import memberSlice from "../features/memberSlice";
import axios from "axios";

export const Fetch = (token) => {
    const dispatch = useDispatch()
    axios.get('http://localhost:8000/api/records/', { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {console.log(res); dispatch(memberSlice.actions.setRecords(res.data)) })
    .catch(e => console.log('Error fetching data records', { e }))

    axios.get('http://localhost:8000/api/category/', { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {console.log(res); dispatch(memberSlice.actions.setCategory(res.data)) })
    .catch(e => console.log('Error fetching data records', { e }))

    (axios.get('http://localhost:8000/api/members/', { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => { dispatch(memberSlice.actions.setMembers(res.data)) })
    .catch(e => console.log('Error fetching data members', { e })))
}