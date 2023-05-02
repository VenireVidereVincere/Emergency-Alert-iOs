import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactReducer from '../reducers/contacts'
import platformReducer from '../reducers/platform'
import miscReducer from '../reducers/misc'

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    platform: platformReducer,
    misc: miscReducer
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
