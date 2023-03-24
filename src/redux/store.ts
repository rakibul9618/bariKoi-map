import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./addressSlice/addressSlice";
import mapViewportSlice from "./mapViewportSlice/mapViewportSlice";

export const store = configureStore({
  reducer: {
    address: addressSlice,
    mapViewport: mapViewportSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
