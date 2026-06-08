import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import messagesReducer from "./MessagesSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware
    ),
});

export default store;