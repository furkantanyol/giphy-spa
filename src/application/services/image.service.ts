import { IImageService } from '@/domain/application/services/image.service';
import {
  IGiphyApi,
  IGiphyApiSearchRequestParamsWithoutApiKey,
  IGiphyApiSearchResponse,
} from '@/domain/models/giphy-api';

export class ImageService implements IImageService {
  constructor(private readonly giphyApi: IGiphyApi) {}

  async searchGifs(
    query: IGiphyApiSearchRequestParamsWithoutApiKey
  ): Promise<IGiphyApiSearchResponse> {
    return this.giphyApi.search(query);
  }

  abort(): void {
    this.giphyApi.abort();
  }
}
