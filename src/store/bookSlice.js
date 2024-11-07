import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    selectedBook: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = [...state.books, ...action.payload];
    },
    resetBooks: (state) => {
      state.books = [];
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
});

export const { setBooks, setSelectedBook, resetBooks } = bookSlice.actions;
export default bookSlice.reducer;
