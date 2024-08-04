import { createSlice } from "@reduxjs/toolkit";

const mainVideoSlice = createSlice({
  name: "mainVideo",
  initialState: [],
  reducers: {
    addVideos: (state, action) => {
      return action.payload;
    },
    appendVideos: (state, action) => {
      return [...state, ...action.payload];
    },
  },
});
export const { addVideos, appendVideos } = mainVideoSlice.actions;
export default mainVideoSlice.reducer;
