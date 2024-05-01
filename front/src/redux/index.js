import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    log: "out",
    token: "",
  },
  reducers: {
    // Toutes les fonctions qui vont agir sur le user : connexion, déconnexion, stockage données
  },
});
