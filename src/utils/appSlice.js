import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
    isDarkMode: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});
export const { toggleMenu, closeMenu, toggleMode } = appSlice.actions;
export default appSlice.reducer;
