import { createSlice } from '@reduxjs/toolkit';
import { Platform } from 'react-native';

interface PlatformState {
  platform: string
}

const initialState: PlatformState = {
  platform: ''
};

const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    getPlatform: (state) => {
      state.platform = Platform.OS
    }
  },
});

export const { getPlatform } = platformSlice.actions;
export default platformSlice.reducer;