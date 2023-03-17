import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import thunk from "redux-thunk";

export const myStore = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: [thunk],
});
