import baseURL from './api';

const apiKey = process.env.NEXT_PUBLIC_BARIKOI_API_KEY;

class SearchService {
  async autocompleteList(value: string): Promise<any> {
    return await baseURL.get(`/search/autocomplete/${apiKey}/place?q=${value}`);
  }
}

export default new SearchService();
