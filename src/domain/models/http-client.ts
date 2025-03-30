import { IApiQueryParams } from './api';

export interface IHttpClient {
  get<T>(
    url: string,
    options?: RequestOptions
  ): Promise<{ data: T; status: number }>;
}

export interface RequestOptions {
  params?: IApiQueryParams;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}
