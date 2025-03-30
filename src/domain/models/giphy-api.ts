import { z } from '@/lib/validation';

export const giphyApiSearchRequestParamsSchema = z
  .object({
    api_key: z.string(),
    q: z.string().max(50),
    limit: z.number().int().min(1).max(50).default(25),
    offset: z.number().int().min(0).max(4999).default(0),
    rating: z.enum(['g', 'pg', 'pg-13', 'r']).optional(),
    lang: z.string().length(2).optional(),
    random_id: z.string().optional(),
    bundle: z.string().optional(),
    country_code: z.string().length(2).optional(),
  })
  .strict();

const userSchema = z
  .object({
    avatar_url: z.string().url().optional(),
    banner_url: z.string().url().optional(),
    profile_url: z.string().url().optional(),
    username: z.string().optional(),
    display_name: z.string().optional(),
  })
  .strict();

const renditionSchema = z
  .object({
    url: z.string().url(),
    width: z.string(),
    height: z.string(),
    size: z.string().optional(),
    mp4: z.string().url().optional(),
    mp4_size: z.string().optional(),
    webp: z.string().url().optional(),
    webp_size: z.string().optional(),
    frames: z.string().optional(),
  })
  .strict();

const stillRenditionSchema = z
  .object({
    url: z.string().url(),
    width: z.string(),
    height: z.string(),
  })
  .strict();

const downsizedRenditionSchema = z
  .object({
    url: z.string().url(),
    width: z.string(),
    height: z.string(),
    size: z.string(),
  })
  .strict();

const previewRenditionSchema = z
  .object({
    mp4: z.string().url(),
    mp4_size: z.string(),
    width: z.string(),
    height: z.string(),
  })
  .strict();

const loopingRenditionSchema = z
  .object({
    mp4: z.string().url(),
  })
  .strict();

const previewGifRenditionSchema = z
  .object({
    url: z.string().url(),
    width: z.string(),
    height: z.string(),
  })
  .strict();

const downsizedSmallRenditionSchema = z
  .object({
    mp4: z.string().url(),
    width: z.string(),
    height: z.string(),
    mp4_size: z.string(),
  })
  .strict();

const imagesSchema = z
  .object({
    fixed_height: renditionSchema.optional(),
    fixed_height_still: stillRenditionSchema.optional(),
    fixed_height_downsampled: renditionSchema.optional(),
    fixed_width: renditionSchema.optional(),
    fixed_width_still: stillRenditionSchema.optional(),
    fixed_width_downsampled: renditionSchema.optional(),
    fixed_height_small: renditionSchema.optional(),
    fixed_height_small_still: stillRenditionSchema.optional(),
    fixed_width_small: renditionSchema.optional(),
    fixed_width_small_still: stillRenditionSchema.optional(),
    downsized: downsizedRenditionSchema.optional(),
    downsized_still: stillRenditionSchema.optional(),
    downsized_large: downsizedRenditionSchema.optional(),
    downsized_medium: downsizedRenditionSchema.optional(),
    downsized_small: downsizedSmallRenditionSchema.optional(),
    original: renditionSchema.optional(),
    original_still: stillRenditionSchema.optional(),
    looping: loopingRenditionSchema.optional(),
    preview: previewRenditionSchema.optional(),
    preview_gif: previewGifRenditionSchema.optional(),
  })
  .strict();

export const gifSchema = z
  .object({
    type: z.string().default('gif'),
    id: z.string(),
    slug: z.string(),
    url: z.string().url(),
    bitly_url: z.string().url(),
    embed_url: z.string().url(),
    username: z.string().optional(),
    source: z.string().optional(),
    rating: z.enum(['y', 'g', 'pg', 'pg-13', 'r']),
    content_url: z.string().optional(),
    user: userSchema.optional(),
    source_tld: z.string().optional(),
    source_post_url: z.string().url().optional(),
    update_datetime: z.string().optional(),
    create_datetime: z.string().optional(),
    import_datetime: z.string().optional(),
    trending_datetime: z.string().optional(),
    images: imagesSchema,
    title: z.string().optional(),
    alt_text: z.string().optional(),
  })
  .strict();

export const paginationSchema = z
  .object({
    offset: z.number().int().min(0),
    total_count: z.number().int().min(0),
    count: z.number().int().min(0),
  })
  .strict();

export const metaSchema = z
  .object({
    msg: z.string(),
    status: z.number().int().min(200).max(599),
    response_id: z.string(),
  })
  .strict();

export const giphyApiSearchResponseSchema = z
  .object({
    data: z.array(gifSchema),
    pagination: paginationSchema,
    meta: metaSchema,
  })
  .strict();

export type IGiphyApiSearchRequestParams = z.infer<
  typeof giphyApiSearchRequestParamsSchema
>;
export type IGiphyApiSearchRequestParamsWithoutApiKey = Omit<
  IGiphyApiSearchRequestParams,
  'api_key'
>;
export type IGiphyApiSearchResponse = z.infer<
  typeof giphyApiSearchResponseSchema
>;
export interface IGiphyApi {
  search(
    searchParams: IGiphyApiSearchRequestParamsWithoutApiKey
  ): Promise<IGiphyApiSearchResponse>;
  abort(): void;
}

export const DEFAULT_LIMIT = 10;
