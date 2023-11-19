import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import browserHistory from '../browser-history';
import { AppRoute } from '../types';

type DetailMessageType = {
  message: string;
  details: [
    {
      property: string;
      value: string;
      messages: [string];
    }
  ];
};

const BACKEND_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMap = <Record<number, boolean>>{
  [StatusCodes.BAD_REQUEST]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  StatusCodeMap[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data.details[0].messages[0];

        toast.warn(detailMessage);
      }

      if (error.response?.status === StatusCodes['NOT_FOUND']) {
        browserHistory.push(AppRoute.NotFound);
      }

      throw error;
    }
  );

  return api;
};
