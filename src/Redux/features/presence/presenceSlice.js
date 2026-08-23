import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
};

const presenceSlice = createSlice({
  name: "presence",

  initialState,

  reducers: {
    updatePresence(state, action) {
      const {
        user_id,
        is_online,
        last_seen_at,
      } = action.payload;

      state.users[user_id] = {
        is_online,
        last_seen_at,
      };
    },

    removePresence(state, action) {
      delete state.users[action.payload];
    },

    clearPresence(state) {
      state.users = {};
    },
  },
});

export const {
  updatePresence,
  removePresence,
  clearPresence,
} = presenceSlice.actions;

export default presenceSlice.reducer;