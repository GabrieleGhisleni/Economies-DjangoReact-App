import React, { useEffect } from 'react';
import {  Container } from 'reactstrap';
import {useLocation} from 'react-router-dom';
import RenderMember from './ConfigMembers';
import RenderdCategory from './ConfigCategory';
import RenderdSubCat from './ConfigSubCat';
import calculateWith from './container_width';

const Configurations = () => {
    const location = useLocation()
    useEffect(() => {
        if (location.hash) document.getElementById(location.hash.slice(1)).scrollIntoView({behavior:"smooth"})
        else window.scrollTo({top:0, left:0, behavior:"smooth"})
    }, [location,])
    let myWidth = calculateWith(window.innerWidth);
    return (
            <Container fluid style={{width: myWidth}}>
                <div id='member'>< RenderMember /></div>
                <div id='category'>< RenderdCategory /></div>
                <div id='subcategory'>< RenderdSubCat /></div>
            </Container>
    )
}

export default Configurations;