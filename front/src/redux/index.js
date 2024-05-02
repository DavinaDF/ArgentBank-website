import { configureStore, createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "Log",
  initialState: {
    status: "out",
    token: "",
    userName: "",
  },
  reducers: {
    // Toutes les fonctions qui vont agir sur le user : connexion, déconnexion, stockage données
    // action : {type: '', playload: tout ce qu'on veut}
    logIn: (state, action) => {
      state.status = action.payload;
    },
    logOut: (state, action) => {},
  },
});

export const mainStore = configureStore({
  reducer: {
    Log: logSlice.reducer,
  },
});
