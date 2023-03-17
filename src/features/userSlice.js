import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getData, getToken, userEdit } from "./userAPI";

const initialState = {
  firstName: null,
  lastName: null,
  logged: false,
  token: null,
  error: null,
};

export const authGetToken = createAsyncThunk(
  "user/authGetToken",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await getToken(data.email, data.password);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await getData();

      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "user/udateProfile",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await userEdit(data.fname, data.lname);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
      state.logged = false;
      state.firstName = null;
      state.lastName = null;
      sessionStorage.removeItem("token");
    },
    getSession: (state, action) => {
      state.token = action.payload;
      state.logged = true;
    },
  },

  extraReducers: {
    /**  **   get Token     **    **/

    [authGetToken.pending]: (state, action) => {
      console.log("laoding data....");
      state.error = null;
    },
    [authGetToken.fulfilled]: (state, action) => {
      if (action.payload != null) {
        state.token = action.payload;
        state.logged = true;
        sessionStorage.setItem("token", action.payload);
      }
    },
    [authGetToken.rejected]: (state, action) => {
      state.error = "Request failed check you Email and Password";
      state.logged = false;
      console.log(action.payload);
    },

    /**  **   get full name user   **    **/

    [getProfile.pending]: (state, action) => {
      console.log("laoding data profile....");
    },
    [getProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    [getProfile.rejected]: (state, action) => {
      console.log(action.payload);
    },

    /**  **   update name user   **    **/

    [updateProfile.pending]: (state, action) => {
      console.log("updating name....");
    },
    [updateProfile.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.firstName = action.payload.body.firstName;
      state.lastName = action.payload.body.lastName;
    },
    [updateProfile.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});
export const { logout, getSession } = userSlice.actions;
export default userSlice.reducer;
