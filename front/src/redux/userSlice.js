import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action pour connexion utilisateur
export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      const data = await response.json();
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action asynchrone pour obtenir le profil utilisateur
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (userToken, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action asynchrone pour modifier le surnom de l'utilisateur
export const updateUserName = createAsyncThunk(
  "user/updateUserName",
  async ({ userNameEdited, userToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: userNameEdited }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Création d'une section du store liée aux users
const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthentificated: false,
    token: null,
    requestError: null,
    userProfile: {
      userFirstName: null,
      userLastName: null,
      userName: null,
    },
  },
  reducers: {
    logOut: (state) => {
      state.isAuthentificated = false;
      state.token = null;
      state.error = null;
      state.userProfile.userFirstName = null;
      state.userProfile.userLastName = null;
      state.userProfile.userName = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.isAuthentificated = true;
      state.token = payload.token;
      state.error = null;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.error = "////Les identifiants sont incorrects.";
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.userProfile.userFirstName = payload.firstName;
      state.userProfile.userLastName = payload.lastName;
      state.userProfile.userName = payload.userName;
    });
    builder.addCase(getProfile.rejected, (state, { payload }) => {
      state.error = payload || "Erreur lors de la récupération du profil.";
    });
    builder.addCase(updateUserName.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.userProfile.userName = payload.userName;
    });
    builder.addCase(updateUserName.rejected, (state, { payload }) => {
      state.error = payload || "Erreur lors de la modification du profil. !!!!";
    });
  },
});

// Extraire et exporter l'action de déconnexion
export const { logOut } = userSlice.actions;

export default userSlice;
