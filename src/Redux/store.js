import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import messagesReducer from "./MessagesSlice";
import authReducer from "./authSlice";
import { setupListeners } from '@reduxjs/toolkit/query'
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
setupListeners(store.dispatch)

export default store;