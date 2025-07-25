import axios from 'axios';
import { axiosInstance } from './axios';

type ApiResponse<T> = {
  statusCode: number;
  responseCode: number;
  responseMessage: string;
  data: T;
};

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  data?: FormData | string | Record<string, unknown>;
  headers?: Record<string, string>;
};

export const fetchClient = async <T>({
  method = 'GET',
  endpoint,
  data,
  headers,
}: FetchOptions) => {
  try {
    const response = await axiosInstance.request<
      ApiResponse<T>
    >({
      method,
      url: endpoint,
      data,
      headers,
    });

    const {
      responseCode,
      responseMessage,
      data: responseData,
    } = response.data;

    if (responseCode < 0) {
      throw new Error(
        responseMessage || '잘못된 요청입니다.',
      );
    }
    return responseData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      if (response?.data.responseCode < 0) {
        throw new Error(
          response?.data.responseMessage ||
            '잘못된 요청입니다.',
        );
      }
      throw new Error(
        response?.data.message || '요청 실패',
      );
    }
    throw new Error('알 수 없는 에러 발생');
  }
};
