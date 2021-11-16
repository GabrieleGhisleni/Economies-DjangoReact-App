import {createSlice } from '@reduxjs/toolkit';



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
           
        },
        setAccount: (state, action) => {
            state.account = action.payload
        },
        logout:( state ) => {
            state.isLogged=false
            state.token = null
            state.refreshToken = null
        }, 
        setLogin: (state) =>  {
            state.isLogged = true
        }

    }});

export default authSlice;
