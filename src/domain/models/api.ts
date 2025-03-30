export interface IApiQueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface IApiPayload {
  [key: string]: unknown;
}

export enum ErrorType {
  GENERIC = 'GENERIC',
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
  CANCELLED = 'CANCELLED',
}

export interface IApiError extends Error {
  message: `${ErrorType} - ${string}`;
}
