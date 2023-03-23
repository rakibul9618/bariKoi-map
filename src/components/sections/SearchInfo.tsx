import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import SearchService from '@/services/SearchService';
import { AddressType } from '@/@types/map';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';
import {
  addressState,
  removeAddress,
  setAddress,
} from '@/redux/addressSlice/addressSlice';
import { setLatLng } from '@/redux/mapViewportSlice/mapViewportSlice';
import { SearchInfoPropsType } from '@/@types/sections';

// icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';

const SearchInfo: React.FC<SearchInfoPropsType> = ({
  isExpand,
  setIsExpand,
}) => {
  // states
  const [searchValue, setSearchValue] = useState<string>('');
  const [autoCompleteList, setAutoCompleteList] = useState<AddressType[]>([]);

  // redux state and dispatch
  const { address } = useAppSelector(addressState);
  const dispatch = useAppDispatch();

  // on change handler for search input field
  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setSearchValue(value);
    dispatch(removeAddress());
    try {
      const { places } = await SearchService.autocompleteList(value);
      setAutoCompleteList(places ?? []);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // set the new address when user click an address from search dropdown
  const handleAddress = (address: AddressType) => {
    const { longitude, latitude } = address;
    dispatch(setAddress(address));
    dispatch(
      setLatLng({ longitude: Number(longitude), latitude: Number(latitude) }),
    );
    setAutoCompleteList([]);
    setSearchValue(address.address.split(',')[0]);
  };

  return (
    <Box
      sx={{
        p: '20px',
        width: '50%',
        marginLeft: `${isExpand ? '0px' : '-50%'}`,
        transition: 'margin-left 0.3s',
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: '500',
            color: '#4c5976',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box component="span">Bari</Box>
          <Box component="span" sx={{ color: '#2ddbac' }}>
            Koi
          </Box>
        </Typography>
        <Button
          sx={{
            color: '#000',
            position: `${isExpand ? 'static' : 'absolute'}`,
            left: '10px',
            top: '20px',
            zIndex: '999',
          }}
          onClick={() => setIsExpand(!isExpand)}
        >
          <ArrowBackIosIcon
            sx={{
              width: '20px',
              transform: `${isExpand ? 'rotate(0deg)' : 'rotate(180deg)'}`,
              transition: 'transform 0.3s',
            }}
          />
        </Button>
      </Box>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={{
            px: '12px',
            py: '8px',
            boxShadow: '3px 4px 10px -4px rgba(0,0,0,.25)',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            mt: '40px',
            borderRadius: `${
              autoCompleteList.length > 0 ? '8px 8px 0 0' : '8px'
            }`,
          }}
        >
          <Input
            name="search"
            onChange={onChangeHandler}
            placeholder="Search location"
            type="text"
            value={searchValue}
          />
          <Button
            sx={{
              px: '10px',
              py: '5px',
              background: 'linear-gradient(90deg,#3cb4be,#43de7f)',
            }}
            onClick={() =>
              autoCompleteList.length > 0 && handleAddress(autoCompleteList[0])
            }
          >
            <SearchIcon />
          </Button>
        </Box>

        {autoCompleteList.length > 0 && (
          <Box
            component="ul"
            sx={{
              position: 'absolute',
              left: '0px',
              right: '0px',
              top: '55px',
              background: '#fdfdfd',
              p: '12px 20px',
              boxShadow: '0 2px 4px rgba(0,0,0,.2)',
              borderRadius: '0 0 8px 8px',
              listStyleType: 'none',
            }}
          >
            {autoCompleteList.map((addressList: AddressType) => (
              <Box
                component="li"
                sx={{ cursor: 'pointer', py: '5px' }}
                key={addressList.id}
                onClick={() => handleAddress(addressList)}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: '400', fontSize: '16px', color: '#3c4043' }}
                  className="line-clamp-1"
                >
                  {addressList.address}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {address.id && (
        <Box sx={{ mt: '50px' }}>
          <Typography variant="h5">{address.place}</Typography>
          <Typography sx={{ mt: '5px' }}>{address.address}</Typography>
          <Typography sx={{ mt: '5px' }}>Thana: {address.city}</Typography>
          <Typography sx={{ mt: '5px' }}>District: {address.area}</Typography>
          <Typography sx={{ mt: '5px' }}>
            Postcode: {address.postCode}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchInfo;
