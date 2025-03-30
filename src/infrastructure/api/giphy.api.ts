import { ErrorType, IApiError } from '@/domain/models/api';
import {
  IGiphyApi,
  IGiphyApiSearchRequestParams,
  IGiphyApiSearchRequestParamsWithoutApiKey,
  IGiphyApiSearchResponse,
  giphyApiSearchRequestParamsSchema,
  giphyApiSearchResponseSchema,
} from '@/domain/models/giphy-api';
import { HttpClient } from '@/infrastructure/api/http-client';

export class GiphyApi implements IGiphyApi {
  private abortController: AbortController | null = null;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly apiUrl: string = process.env.NEXT_PUBLIC_GIPHY_API_URL ||
      '',
    private readonly apiKey: string = process.env.NEXT_PUBLIC_GIPHY_API_KEY ||
      ''
  ) {
    if (!this.apiUrl) {
      throw new Error('Giphy API URL is required');
    }

    if (!this.apiKey) {
      throw new Error('Giphy API key is required');
    }
  }

  private validateParams(
    params: IGiphyApiSearchRequestParams
  ): IGiphyApiSearchRequestParams {
    return giphyApiSearchRequestParamsSchema.parse(params);
  }

  private validateResponse(
    response: IGiphyApiSearchResponse
  ): IGiphyApiSearchResponse {
    return giphyApiSearchResponseSchema.parse(response);
  }

  private convertToApiError(error: unknown): IApiError {
    if (error instanceof Error) {
      if (error.name === 'ZodError') {
        return new Error(
          `${ErrorType.VALIDATION} - Invalid request or response data`
        ) as IApiError;
      }

      if (error.name === 'AbortError') {
        return new Error(
          `${ErrorType.CANCELLED} - Request was aborted`
        ) as IApiError;
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        return new Error(
          `${ErrorType.NETWORK} - Network error occurred`
        ) as IApiError;
      }

      return new Error(
        `${ErrorType.UNKNOWN} - Failed to search Giphy`
      ) as IApiError;
    }

    return new Error(
      `${ErrorType.UNKNOWN} - Failed to search Giphy`
    ) as IApiError;
  }

  async search(
    searchParams: IGiphyApiSearchRequestParamsWithoutApiKey
  ): Promise<IGiphyApiSearchResponse> {
    this.abort(); // abort any previous requests
    this.abortController = new AbortController();

    try {
      const params: IGiphyApiSearchRequestParams = {
        ...searchParams,
        api_key: this.apiKey,
      };

      const validatedParams = this.validateParams(params);

      const response: { data: IGiphyApiSearchResponse; status: number } =
        await this.httpClient.get<IGiphyApiSearchResponse>(this.apiUrl, {
          params: validatedParams,
          signal: this.abortController.signal,
        });

      return response.data;
    } catch (error) {
      const apiError = this.convertToApiError(error);
      throw apiError;
    }
  }

  abort(): void {
    if (!this.abortController) return;

    this.abortController.abort();
    this.abortController = null;
  }
}
