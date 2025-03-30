'use client';

import { SUPPORTED_LANGUAGES } from '@/domain/models/languages';
import { useForm, zodResolver } from '@/lib/form';
import { SearchIcon, XIcon } from '@/lib/icons';
import { z } from '@/lib/validation';
import { Button } from '@/presentation/components/atoms/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/presentation/components/atoms/form';
import { Input } from '@/presentation/components/atoms/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/atoms/select';
import { useId } from 'react';

interface SearchFormProps {
  onSearch: (query: string, language?: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const searchFormSchema = z.object({
  query: z.string().min(1, 'Please enter a search term'),
  language: z.string().default('en'),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function SearchForm({
  onSearch,
  onCancel,
  isLoading,
}: SearchFormProps) {
  const searchInputId = useId();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
      language: 'en',
    },
  });

  // Watch the query field to reactively update the button state
  const query = form.watch('query');

  const handleSubmit = (values: SearchFormValues) => {
    onSearch(values.query, values.language || 'en');
  };

  const handleClear = () => {
    form.reset();
    if (isLoading) {
      onCancel();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor={searchInputId}>Search</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id={searchInputId}
                      placeholder="Search for GIFs..."
                      disabled={isLoading}
                      {...field}
                    />
                    {field.value && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={handleClear}
                        disabled={isLoading}
                        aria-label="Clear search"
                      >
                        <XIcon className="size-4" />
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="w-full sm:w-40">
                <FormLabel>Language</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span>
                          {lang.flag} {lang.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="h-10 px-4"
          >
            {isLoading ? (
              <span>Searching...</span>
            ) : (
              <>
                <SearchIcon className="size-4" />
                <span>Search</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
