import { AxiosError } from 'axios';
import type { ApiError } from '../Types/types';


export function handleApiError(error: unknown): ApiError {
  const axiosError = error as AxiosError<ApiError>;

  if (axiosError.response) {
    const statusCode = axiosError.response.status;
    const errorData = axiosError.response.data;
    console.log(errorData)
    return {
      message: errorData.message || 'API request failed',
      statusCode,
      errors: errorData.errors,
      success: false
    };
  } else if (axiosError.request) {
    return {
      message: 'No response from server. Please check your internet connection.',
      statusCode: 0,
      success: false
    };
  } else {
    return {
      message: axiosError.message || 'An unexpected error occurred',
      statusCode: 0,
      success: false
    };
  }
}
