import { configureStore, createSlice } from "@reduxjs/toolkit";

// Création d'une section du store liée aux users
const userSlice = createSlice({
  name: "User",
  initialState: {
    isAuthentificated: false,
    token: null,
    userProfile: {
      userFirstName: null,
      userLastName: null,
      userName: null,
    },
  },
  reducers: {
    // Toutes les fonctions qui vont agir sur le user : connexion, déconnexion, stockage données
    // action : {type: '', payload: tout ce qu'on veut}
    logIn: (state, action) => {
      state.isAuthentificated = true;
      state.token = action.payload;
    },
    logOut: (state) => {
      state.isAuthentificated = false;
      state.token = null;
      state.userProfile.userFirstName = null;
      state.userProfile.userLastName = null;
      state.userProfile.userName = null;
    },
    getProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    editProfile: (state, action) => {
      state.userProfile.userName = action.payload;
    },
  },
});

export default userSlice;

export const mainStore = configureStore({
  reducer: {
    User: userSlice.reducer,
  },
  // middleware: getDefaultMiddleware(),
  devTools: true,
});
