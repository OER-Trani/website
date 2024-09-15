import { useQuery, type QueryClient } from '@tanstack/react-query';
import wpClient from '../../lib/wpapi/client';
import { getPages } from '../../lib/wpapi/features/pages';
import type { PageType } from '../../lib/wpapi/types/page';

interface IuseGetPageParams {
  id: number;
  queryClient: QueryClient;
}

export function useGetPage({ id, queryClient }: IuseGetPageParams) {
  const select = (data: QueryFnGetPagesOutput) => data.pages[id];
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
}> {
  const response = await getPages(wpClient);

  if (response) {
    const pages = response.reduce(
      (acc, current) => ({
        ...acc,
        [current.id]: current,
      }),
      {},
    );

    return {
      pages,
      pageIds: response.map((page) => page.id).reverse(),
    };
  }

  return {
    pages: {},
    pageIds: [],
  };
}
