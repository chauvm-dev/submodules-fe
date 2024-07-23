import axios, { CreateAxiosDefaults } from 'axios';

type CreateAxiosClientParams = {
  options: CreateAxiosDefaults<any>;
};

export type ErrorType = {
  statusCode: number;
  message: string;
  errors: string[];
};

const createAxiosClient = ({ options }: CreateAxiosClientParams) => {
  const client = axios.create(options);

  return client;
};

export const client = createAxiosClient({
  options: {
    baseURL: import.meta.env.VITE_HOST_API,
    timeout: 30 * 1000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
});
