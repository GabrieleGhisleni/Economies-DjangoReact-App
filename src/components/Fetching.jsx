import { useDispatch } from "react-redux";
import memberSlice from "../features/memberSlice";
import axios from "axios";

export const Fetch = (token, dispatch) => {
    axios.get('http://localhost:8000/api/records/', { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {dispatch(memberSlice.actions.setRecords(res.data)) })
    .catch(e => console.log('Error fetching data records', { e }))

    axios.get('http://localhost:8000/api/category/', { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {dispatch(memberSlice.actions.setCategory(res.data)) })
    .catch(e => console.log('Error fetching data cat', { e }))

    (axios.get('http://localhost:8000/api/sub_category/', { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {dispatch(memberSlice.actions.setSubCategory(res.data)) })
    .catch(e => console.log('Error fetching data subcat', { e })))

    (axios.get('http://localhost:8000/api/members/', { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => { dispatch(memberSlice.actions.setMembers(res.data)) })
    .catch(e => console.log('Error fetching data members', { e })))
}