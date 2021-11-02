import {createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
    name: 'members',
    initialState: {
        members: [],
        records: [],
        categories:[]
    },
    reducers: {
        setMembers: (state, action) => {
            state.members = action.payload;
        },
        setRecords: (state, action) => {
            state.records = action.payload
        },
        setCategory: (state, action) => {
            state.categories = action.payload
        },
        addRecords: (state, action) => {
            state.records.push(action.payload)
        },
        removeRecords: (state, action) => {
            state.records = state.records.filter((record) => record.id != action.payload)
        }
    }});

export default memberSlice;
