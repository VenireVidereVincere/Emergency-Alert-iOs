import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CountdownType = {
    isCountdownCancelled: boolean,
    currentCount: number,
    isCountdownFinished: boolean
}

const initialState: CountdownType = {
    isCountdownCancelled: false,
    currentCount: 7,
    isCountdownFinished:false
}

const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    setIsCountdownCancelled: (state, action: PayloadAction<boolean>) => {
        state.isCountdownCancelled = action.payload
    },
    reduceCurrentCountByOne: (state) => {
        state.currentCount--
    },
    resetCurrentCount: (state) => {
        state.currentCount = initialState.currentCount
    },
    setIsCountdownFinished: (state, action: PayloadAction<boolean>) => {
        state.isCountdownFinished = action.payload
    }
  }
})

export const { setIsCountdownCancelled, reduceCurrentCountByOne, resetCurrentCount, setIsCountdownFinished } = countdownSlice.actions

export default countdownSlice.reducer