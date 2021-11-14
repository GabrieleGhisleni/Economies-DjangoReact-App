import {createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
    name: 'members',
    initialState: {
        members: [],
        records: [],
        categories:[],
        subcategories:[],
        base_url: 'http://localhost:8000',
        // base_url:'https://smart-economies.herokuapp.com'
    },
    reducers: {
        // members
        setMembers: (state, action) => {
            state.members = action.payload;
        },
        addMember: (state, action) => {
            state.members.push(action.payload)
        },
        removeMember: (state, action) => {
            state.members = state.members.filter((subc) => subc.id != action.payload)
            state.records = state.records.filter((r) => r.made_by != action.payload)
        },
        updateMember: (state, action) => {
            const index = state.members.findIndex((el) => el.id === action.payload.values.data.id)
            state.members[index] = action.payload.values.data
        },
        // Categories
        setCategory: (state, action) => {
            state.categories = action.payload
        },
        addCat: (state, action) => {
            state.categories.push(action.payload)
        },
        removeCat: (state, action) => {
            state.records = state.records.filter((r) => r.category_associated == action.payload)
            state.records.forEach((r) => {r.category_associated = null})
            state.categories = state.categories.filter((subc) => subc.id != action.payload)
        },
        updateCat: (state, action) => {
            const index = state.categories.findIndex((el) => el.id === action.payload.values.data.id)
            state.categories[index] = action.payload.values.data
        },
        // subcategories
        setSubCategory: (state, action) => {
            state.subcategories = action.payload
        },
        addSub: (state, action) => {
            state.subcategories.push(action.payload)
        },
        removeSub: (state, action) => {
            state.records = state.records.filter((r) => r.sub_category_associated == action.payload)
            state.records.forEach((r) => {r.sub_category_associated = null})
            state.subcategories = state.subcategories.filter((subc) => subc.id != action.payload)
        },
        updateSub: (state, action) => {
            const index = state.subcategories.findIndex((el) => el.id === action.payload.values.data.id)
            state.subcategories[index] = action.payload.values.data
        },
        // records
        setRecords: (state, action) => {
            state.records = action.payload
        },
        addRecords: (state, action) => {
            state.records.push(action.payload)
        },
        removeRecord: (state, action) => {
            state.records = state.records.filter((record) => record.id != action.payload)
        },
        updateRecord: (state, action) => {
            const index = state.records.findIndex((el) => el.id === action.payload.values.data.id)
            state.records[index] = action.payload.values.data
        }
    }});

export default memberSlice;
