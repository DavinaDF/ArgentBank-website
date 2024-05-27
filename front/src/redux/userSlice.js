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
      console.log(error.message);
      throw rejectWithValue(error.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async ({ userToken }, { rejectWithValue, fulfillWithValue }) => {
    console.log({ userToken });
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

      const data = response.json();
      console.log(data);
      console.log(data.body);
      return fulfillWithValue(data.body);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

// const updateUserName = createAsyncThunk(

// );

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
    // getProfile: (state, action) => {
    //   state.userProfile = action.payload;
    // },
    // editProfile: (state, action) => {
    //   state.userProfile.userName = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.isAuthentificated = true;
      state.token = payload.token;
      state.error = null;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.error = "Les identifiants sont incorrects.";
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.userProfile.userFirstName = payload.firstName;
      state.userProfile.userLastName = payload.lastName;
      state.userProfile.userName = payload.userName;
    });
  },
});

// Extraire et exporter chaque action
export const { logOut } = userSlice.actions;

export default userSlice;
