import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data.body);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

// Création d'une section du store liée aux users
const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthentificated: false,
    token: null,
    error: null,
    userProfile: {
      userFirstName: null,
      userLastName: null,
      userName: null,
    },
  },
  reducers: {
    // Toutes les fonctions qui vont agir sur le user : connexion, déconnexion, stockage données
    // action : {type: '', payload: tout ce qu'on veut}
    // logIn: (state, action) => {
    //   state.isAuthentificated = true;
    //   state.token = action.payload;
    // },

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
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isAuthentificated = true;
      state.token = payload.token;
      state.error = null;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.error = "Les identifiants sont incorrects.";
    });
  },
});

// Extraire et exporter chaque action
export const { logOut, getProfile, editProfile } = userSlice.actions;

export default userSlice;
