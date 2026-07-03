import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import messagesReducer from "./MessagesSlice";
import authReducer from "./authSlice";

import presenceReducer from "./features/presence/presenceSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    auth: authReducer,
    presence: presenceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware
    ),
});

export default store;