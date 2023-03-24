import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { MapPropsType } from '@/@types/sections';
import maplibregl from 'maplibre-gl';
import GetAddressService from '@/services/GetAddressService';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';
import { addressState, setAddress } from '@/redux/addressSlice/addressSlice';
import ReactMap, {
  NavigationControl,
  Marker,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  FullscreenControl,
} from 'react-map-gl';
import {
  mapViewportState,
  setLatLng,
} from '@/redux/mapViewportSlice/mapViewportSlice';

// css file of maplibre-gl
import 'maplibre-gl/dist/maplibre-gl.css';

// MAPTILER MAP API KEY
const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const Map: React.FC<MapPropsType> = ({ isExpand }) => {
  const mapRef = useRef<any>(null);

  // redux state and dispatch
  const mapViewport = useAppSelector(mapViewportState);
  const { address, isDropdownClick } = useAppSelector(addressState);
  const dispatch = useAppDispatch();

  /**
   * when double click on map change the value of latitude and longitude
   * and get the clicked place details
   */
  let lastTap = 0;
  const handleMapDoubleClick = async (
    event: MapLayerMouseEvent | MapLayerTouchEvent,
  ) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 500 && tapLength > 0) {
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
    }
    lastTap = currentTime;
  };

  /**
   * jump to the specify longitude and latitude of map if user click
   * the search dropdown list
   */
  useEffect(() => {
    if (mapRef.current && address.longitude) {
      const map = mapRef.current.getMap();
      map.jumpTo({
        center: [address.longitude, address.latitude],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownClick]);

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
        onMouseDown={handleMapDoubleClick}
        onTouchStart={handleMapDoubleClick}
        doubleClickZoom={false}
      >
        <NavigationControl position="top-right" />
        <Marker
          longitude={mapViewport.longitude}
          latitude={mapViewport.latitude}
          anchor="bottom"
        ></Marker>
        <FullscreenControl position="top-right" />
      </ReactMap>
    </Box>
  );
};

export default Map;
