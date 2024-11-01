/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery, type QueryClient } from '@tanstack/react-query';
import { makeWpApiCall } from '../../lib/wpapi/features';
import { wpPages } from '../../lib/wpapi/features/pages';
import type { PageType } from '../../lib/wpapi/types/page';

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

async function queryFnGetPages() {
  const cb = async () => wpPages.perPage(10);
  const response = await makeWpApiCall<PageType[]>(cb());

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
  };
}
