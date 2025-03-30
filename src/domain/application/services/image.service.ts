import {
  IGiphyApiSearchRequestParamsWithoutApiKey,
  IGiphyApiSearchResponse,
} from '@/domain/models/giphy-api';

export interface IImageService {
  searchGifs: (
    query: IGiphyApiSearchRequestParamsWithoutApiKey
  ) => Promise<IGiphyApiSearchResponse>;
  abort: () => void;
}
