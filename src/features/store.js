import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authSlice from "./userSlice";
import memberSlice from './memberSlice';

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    members: memberSlice.reducer
});

const persistedReducer = persistReducer(
    {
        key: "root",
        version: 1,
        storage: storage,
        // blacklist: ['members']
    },
    rootReducer
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

export const persistor = persistStore(store);
export default store;