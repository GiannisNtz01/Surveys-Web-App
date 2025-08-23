import { useState } from 'react';

const useError = () => {
  const [error, setError] = useState(null);
  
  const getError = (error) => {
    const _genericCode = 'general';
    if (!error) return _genericCode;
    if (typeof error === 'string') return error;

    const errorResponse = error.response ?? error;
    const errorData =
      errorResponse?.data?.error ?? errorResponse?.data ?? errorResponse;
    if (!errorData) return _genericCode;

    const errorCode =
      errorData.error ??
      errorData.code ??
      errorData.ResponseCode ??
      errorData.statusCode ??
      errorData.status ??
      errorData;

    return errorCode ?? _genericCode;
  };

  const handleError = (errorResponse, scope = 'generic', params = {}) => {
    const errorCode = getError(errorResponse);
    setError({
      errorCode: errorCode,
      errorScope: scope,
      errorParams: params,
    });
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
};

export default useError;
