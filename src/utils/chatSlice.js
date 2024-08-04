import { createSlice } from "@reduxjs/toolkit";
import { OFFSET_LIVE_CHAT } from "./constants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.message.push(action.payload);
      if (state.message.length > OFFSET_LIVE_CHAT) {
        state.message.shift(); // Remove the oldest message
      }
    },
  },
});
export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
