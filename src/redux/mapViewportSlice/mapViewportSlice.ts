import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LatLngType, MapViewPortType } from '@/@types/map';
import { RootState } from '../store';

// initial state value
const initialState: MapViewPortType = {
  latitude: 23.764322948419107,
  longitude: 90.38902078318614,
  zoom: 8,
};

export const mapViewportSlice = createSlice({
  name: 'mapViewport',
  initialState,
  reducers: {
    setLatLng: (state, action: PayloadAction<LatLngType>) => {
      const { latitude, longitude } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
    },
  },
});

export const { setLatLng } = mapViewportSlice.actions;
export default mapViewportSlice.reducer;
export const mapViewportState = (state: RootState) => state.mapViewport;
