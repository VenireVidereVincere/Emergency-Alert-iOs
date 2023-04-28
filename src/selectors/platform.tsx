import { RootState } from "../store/store";

export const selectPlatform = (state: RootState) => state.platform.platform;
