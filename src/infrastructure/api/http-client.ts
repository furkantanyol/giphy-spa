import { IApiQueryParams } from '@/domain/models/api';
import { IHttpClient, RequestOptions } from '@/domain/models/http-client';

export class HttpClient implements IHttpClient {
  private appendQueryParams(url: string, params?: IApiQueryParams): string {
    if (!params) return url;

    const urlObj = new URL(url);

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;
      urlObj.searchParams.append(key, String(value));
    });

    return urlObj.toString();
  }

  async get<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<{ data: T; status: number }> {
    const urlWithParams = this.appendQueryParams(url, options.params);

    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: options.headers,
      signal: options.signal,
    });

    const data = await response.json();

    return {
      data,
      status: response.status,
    };
  }
}
