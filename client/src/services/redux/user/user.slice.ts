import { createSlice } from '@reduxjs/toolkit'
interface CurrentUser  {
  data: {user:{
    name:string,
    photo:File | null | string,
    email:string,
  }};
  role: string,
 _id:string,
 token:string
}
export interface InitialStateProps {
  currentUser:CurrentUser,
  error:React.ReactNode,
  loading:boolean,
}

const initialState: InitialStateProps = {
  currentUser:{
    data: {user:{
      name:'',
      photo: null,
      email:'',
    }},
    token:'',
    role: 'user',
    _id: ''
  },
  error:null,
  loading:false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.loading= true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload,
      state.loading=false,
      state.error=null
    },
    signInFaliure: (state, action) => {
      state.loading=false,
      state.error=action.payload
    },updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
        // @ts-expect-error cant asign the whole object
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
        // @ts-expect-error cant asign the whole object
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFaliure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} = userSlice.actions;

export default userSlice.reducer;
