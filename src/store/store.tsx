import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactReducer from '../reducers/contacts'
import platformReducer from '../reducers/platform'

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    platform: platformReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
