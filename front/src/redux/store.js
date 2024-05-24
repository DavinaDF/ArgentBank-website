import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from ".";

// configuration de persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const mainStore = configureStore({
  reducer: {
    User: persistedReducer,
  },
  // middleware: [
  //   (mainStore) => (next) => (action) => {
  //     console.log("Action", action);
  //     next(action);
  //   },
  // ],
  // middleware: getDefaultMiddleware(),
  devTools: true,
});

export const persistor = persistStore(mainStore);
