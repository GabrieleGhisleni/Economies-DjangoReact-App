import {createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        refreshToken:null,
        isLogged: false,
    },
    reducers: {
        setAuthTokens: (state, action) => {
            state.refreshToken = action.payload.refreshToken;
            state.token = action.payload.token;
            state.isLogged = true;

        },
        setAccount: (state, action) => {
            state.account = action.payload
            state.isLogged = true;
        },
        logout:( state ) => {
            state.isLogged=false
            state.token = null
            state.refreshToken = null
        }

    }});

export default authSlice;
