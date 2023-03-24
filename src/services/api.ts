import axios, { AxiosResponse } from "axios";

// instance for all api call
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BARIKOI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function responseBody(response: AxiosResponse): Promise<AxiosResponse> {
  const res = await response.data;
  return res;
}

// handle CRUD operations and return the data
const baseURL = {
  get: async (url: string) => {
    const res = await instance.get(url).then(responseBody);
    return res;
  },
  post: async (url: string, body: object, options?: object) => {
    const res = await instance.post(url, body, options).then(responseBody);
    return res;
  },
  patch: async (url: string, body: object) => {
    const res = await instance.patch(url, body).then(responseBody);
    return res;
  },
  delete: async (url: string) => {
    const res = await instance.delete(url).then(responseBody);
    return res;
  },
};

export default baseURL;
