import React, { useState } from 'react';
import {  Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import RenderMember from './ConfigMembers'
import RenderdCategory from './ConfigCategory'
import RenderdSubCat from './ConfigSubCat'

const Configurations = () => {
    return (
        <React.Fragment>
            <Container>
                <RenderMember />
                < RenderdCategory />
                < RenderdSubCat />
            </Container>
        </React.Fragment>
    )
}

export default Configurations;