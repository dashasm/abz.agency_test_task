import { createSlice } from "@reduxjs/toolkit";
import { IPosition } from "./types/position";
import { IUser } from "./types/user";

export interface UsersState {
  users: IUser[];
  positions: IPosition[];
  countOfVisibleUsers: number;
  totalUsers: number;
}

const initialState: UsersState = {
  users: [],
  positions: [],
  countOfVisibleUsers: 6,
  totalUsers: 0,
};

export const usersSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    setCountOfVisibleUsers: (state, action) => {
      state.countOfVisibleUsers = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, setPositions, setCountOfVisibleUsers, setTotalUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
