import axios from "axios"
import {useSelector} from 'react-redux'


function Retrive(){
    const token = useSelector(state => state.auth.token)
    console.log(token)
    const getData = () =>{
        axios.get('http://localhost:8000/api/r/', { headers: {"Authorization" : `Bearer ${token}`}})
        .then(data => console.log(data))
        .catch(e => console.log(e))

    }
    return(

    
    <div>
        <button onClick={getData}>
            im here man
        </button>
    </div>)
}

export default Retrive;