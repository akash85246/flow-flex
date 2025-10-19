import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  selectedBoard: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    clearBoards: (state) => {
      state.boards = [];
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    removeBoard: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },
    setSelectedBoard: (state, action) => {
      state.selectedBoard = action.payload;
    },
    clearSelectedBoard: (state) => {
      state.selectedBoard = null;
    },
  },
});

export const {
  setBoards,
  clearBoards,
  addBoard,
  removeBoard,
  setSelectedBoard,
  clearSelectedBoard,
} = boardsSlice.actions;

export default boardsSlice.reducer;