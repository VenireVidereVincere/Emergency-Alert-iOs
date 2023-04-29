import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LocationType } from '../types/Location'

const initialState: LocationType = {
  latitude: 0,
  longitude: 0
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<LocationType>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    }
  }
})

export const { addLocation } = locationSlice.actions

export default locationSlice.reducer