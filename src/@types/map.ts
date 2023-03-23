export type LatLngType = { latitude: number; longitude: number };

export type MapViewPortType = {
  zoom: number;
} & LatLngType;

export interface AddressType {
  id: number | null;
  place?: string;
  address: string;
  area: string;
  city: string;
  latitude: string;
  longitude: string;
  pType: string;
  postCode: number | null;
  uCode: string;
}

export type AddressSliceType = {
  address: AddressType;
};
