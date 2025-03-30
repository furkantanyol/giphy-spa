import { useErrorHandler } from '@/application/hooks/useErrorHandler';
import { useServices } from '@/application/hooks/useServices';
import { ErrorType } from '@/domain/models/api';
import {
  DEFAULT_LIMIT,
  IGiphyApiSearchRequestParamsWithoutApiKey,
  IGiphyApiSearchResponse,
} from '@/domain/models/giphy-api';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@/lib/remote-state';

const keys = {
  all: ['images'] as const,
  search: (query: string, lang?: string) =>
    [...keys.all, 'search', query, lang] as const,
};

export function useSearchGifs(): UseMutationResult<
  IGiphyApiSearchResponse,
  unknown,
  IGiphyApiSearchRequestParamsWithoutApiKey
> {
  const { imageService } = useServices();
  const queryClient = useQueryClient();
  const handleError = useErrorHandler();

  return useMutation({
    mutationFn: async (params: IGiphyApiSearchRequestParamsWithoutApiKey) => {
      if (!params?.q) {
        throw new Error(`${ErrorType.VALIDATION} - Search query is required`);
      }

      const searchParams = {
        ...params,
        limit: params.limit || DEFAULT_LIMIT,
      };

      return imageService.searchGifs(searchParams);
    },
    onSuccess: (data, variables) => {
      // Cache the result with the appropriate key
      if (variables.q) {
        queryClient.setQueryData(
          keys.search(variables.q, variables.lang),
          data
        );
      }
    },
    onError: handleError,
  });
}

export function useAbortGiphySearch(): UseMutationResult<void, unknown, void> {
  const { imageService } = useServices();
  const queryClient = useQueryClient();
  const handleError = useErrorHandler();

  return useMutation({
    mutationFn: async () => {
      imageService.abort();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.all });
    },
    onError: handleError,
  });
}
