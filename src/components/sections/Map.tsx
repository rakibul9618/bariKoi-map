import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import ReactMap, {
  NavigationControl,
  Marker,
  MapLayerMouseEvent,
} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import GetAddressService from '@/services/GetAddressService';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';
import { setAddress } from '@/redux/addressSlice/addressSlice';
import {
  mapViewportState,
  setLatLng,
} from '@/redux/mapViewportSlice/mapViewportSlice';

// css file of maplibre-gl
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPropsType } from '@/@types/sections';

// MAPTILER MAP API KEY
const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const Map: React.FC<MapPropsType> = ({ isExpand }) => {
  const mapRef = useRef<any>(null);

  // redux state and dispatch
  const mapViewport = useAppSelector(mapViewportState);
  const dispatch = useAppDispatch();

  // when double click on map change the value of latitude and longitude
  const handleMapDoubleClick = async (event: MapLayerMouseEvent) => {
    const [longitude, latitude] = event.lngLat.toArray();
    dispatch(setLatLng({ longitude, latitude }));
    try {
      const { place } = await GetAddressService.getAddressWithLatLan({
        longitude,
        latitude,
      });

      const newAddress = {
        id: place.id,
        address: place.address,
        area: place.area,
        city: place.city,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        pType: place.location_type,
        postCode: Number(place.postCode),
        uCode: '',
      };
      dispatch(setAddress(newAddress));
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.jumpTo({
        center: [mapViewport.longitude, mapViewport.latitude],
      });
    }
  }, [mapViewport]);

  // resize the map when toggle the search section
  useEffect(() => {
    setTimeout(() => {
      const map = mapRef.current.getMap();
      map.resize();
    }, 305);
  }, [isExpand]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ReactMap
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={mapViewport}
        style={{ width: '100%', height: ' 100vh' }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`}
        onDblClick={handleMapDoubleClick}
        doubleClickZoom={false}
      >
        <NavigationControl position="bottom-right" />
        <Marker
          longitude={mapViewport.longitude}
          latitude={mapViewport.latitude}
          anchor="bottom"
        ></Marker>
      </ReactMap>
    </Box>
  );
};

export default Map;
