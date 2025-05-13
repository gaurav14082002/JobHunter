import {createSlice} from  "@reduxjs/toolkit"

const AuthSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload
            console.log(state)
        },
        setUser:(state,action)=>{
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
          }
    }
})

export const {setloading,setUser,clearUser} = AuthSlice.actions;
export default AuthSlice.reducer;