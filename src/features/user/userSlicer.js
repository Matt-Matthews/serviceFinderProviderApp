import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged:false,
    userData: [],
    address: null,
    location: null,

}

const userSlicer = createSlice({
    name:'user',
    initialState,
    reducers:{
        getAddress: (state,{payload})=> {
            state.address = payload.address;
            state.location= payload.location;
        },
        getUser: (state,{payload})=>{
            state.userData = payload.userData;
        }
    }
});

export const{getAddress, getUser} = userSlicer.actions;
export default userSlicer.reducer;