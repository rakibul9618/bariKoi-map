import { LatLngType } from '@/@types/map';
import baseURL from './api';

const apiKey = process.env.NEXT_PUBLIC_BARIKOI_API_KEY;

class GetAddressService {
  async getAddressWithLatLan({
    longitude,
    latitude,
  }: LatLngType): Promise<any> {
    return await baseURL.get(
      `/search/reverse/geocode/server/${apiKey}/place?longitude=${longitude}&latitude=${latitude}&district=true&post_code=true&country=true&sub_district=true&union=true&pauroshova=true&location_type=true&division=true&address=true&area=true&bangla=true`,
    );
  }
}

export default new GetAddressService();
