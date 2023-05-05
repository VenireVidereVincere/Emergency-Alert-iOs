import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import contactReducer from '../reducers/contacts';
import platformReducer from '../reducers/platform';
import miscReducer from '../reducers/misc';
import locationReducer from '../reducers/location';
import countdownReducer from '../reducers/countdown';
import { combineReducers } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import emergencyContactsReducer from '../reducers/emergencyContacts';
import AsyncStorage from '@react-native-community/async-storage'
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['emergencyContacts', 'misc'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  emergencyContacts: emergencyContactsReducer,
  contact: contactReducer,
  platform: platformReducer,
  misc: miscReducer,
  location: locationReducer,
  countdown: countdownReducer,
}));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;