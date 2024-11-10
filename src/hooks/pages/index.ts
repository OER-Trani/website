/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery, type QueryClient } from '@tanstack/react-query';
import { getWpPosts } from '../../lib/wp-rest-api';
import { mapPath } from '../../lib/wp-rest-api/constants';
import type { PageType } from '../../lib/wp-rest-api/types/page';

interface IuseGetPageBySlug {
  queryClient: QueryClient;
  slug: string;
}

export function useGetPageBySlug({ queryClient, slug }: IuseGetPageBySlug) {
  // @ts-ignore
  const select = (data: QueryFnGetPagesOutput) => data.pagesBySlug[slug];
  return useGetPages<PageType>({ select, queryClient });
}

interface IuseGetPagesParams<Data> {
  queryClient: QueryClient;
  select?: (data: QueryFnGetPagesOutput) => Data;
}

export function useGetPages<T = QueryFnGetPagesOutput>({
  queryClient,
  select,
}: IuseGetPagesParams<T>) {
  return useQuery(
    {
      queryKey: ['pages'],
      queryFn: queryFnGetPages,
      select,
    },
    queryClient,
  );
}

type QueryFnGetPagesOutput = Awaited<ReturnType<typeof queryFnGetPages>>;

async function queryFnGetPages(): Promise<{
  pages: Record<number, PageType>;
  pageIds: number[];
  pagesBySlug: Record<string, PageType>;
  pageSlugs: string[];
}> {
  const response = await getWpPosts<PageType>({
    path: mapPath.pages,
    params: { per_page: 10, page: 1, sticky: false, order: 'desc' },
  });

  if (response) {
    const pages = response.reduce(
      (acc, current) => ({
        ...acc,
        [current.id]: current,
      }),
      {},
    );
    const pagesBySlug = response.reduce(
      (acc, current) => ({
        ...acc,
        [current.slug]: current,
      }),
      {},
    );

    return {
      pages,
      pageIds: response.map((page) => page.id).reverse(),
      pagesBySlug,
      pageSlugs: response.map((page) => page.slug).reverse(),
    };
  }

  return {
    pages: {},
    pageIds: [],
    pagesBySlug: {},
    pageSlugs: [],
  };
}
