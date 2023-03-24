import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AddressSliceType, AddressType } from '@/@types/map';

// initial state value
const initialState: AddressSliceType = {
  address: {
    id: null,
    place: '',
    address: '',
    area: '',
    city: '',
    latitude: '',
    longitude: '',
    pType: '',
    postCode: null,
    uCode: '',
  },
  isDropdownClick: false,
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<AddressType>) => {
      const newAddress: AddressType = { ...action.payload };
      // if address has comma speared value then get the first value as a place
      if (newAddress.address.indexOf(',') > 0) {
        newAddress.place = newAddress.address.split(',')[0];
        newAddress.address = newAddress.address
          .slice(newAddress.address.indexOf(',') + 1)
          .trim();
      } else {
        newAddress.place = newAddress.address;
      }
      state.address = newAddress;
    },
    removeAddress: (state) => {
      state.address = initialState.address;
    },
    setDropdownClick: (state, action: PayloadAction<boolean>) => {
      state.isDropdownClick = action.payload;
    },
  },
});

export const { setAddress, removeAddress, setDropdownClick } =
  addressSlice.actions;
export default addressSlice.reducer;
export const addressState = (state: RootState) => state.address;
