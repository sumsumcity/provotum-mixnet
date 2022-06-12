import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import stepReducer from "../redux/StepSlice"
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist';


//Actual persist object which will be stored in storage
const persistConfig = {
  key: 'root',
  storage,
};

//All reducers which are created
const reducers = combineReducers({ step: stepReducer });

//Add all reducers to persist object which will be stored
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }),
})