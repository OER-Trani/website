import { useQuery, type QueryClient } from '@tanstack/react-query';
import { makeWpApiCall } from '../../lib/wpapi/features';
import { wpPosts } from '../../lib/wpapi/features/posts';
import type { PostType } from '../../lib/wpapi/types/post';

interface UseGetStickyPostsParams<Data> {
  queryClient: QueryClient;
  select?: (data: QueryFnGetPostsOutput) => Data;
}

export function useGetStickyPosts<T = QueryFnGetPostsOutput>({
  queryClient,
  select,
}: UseGetStickyPostsParams<T>) {
  return useQuery(
    {
      queryKey: ['posts', 'sticky'],
      queryFn: () =>
        queryFnGetPosts({
          page: 1,
          limit: 2,
          sticky: true,
        }),
      select,
    },
    queryClient,
  );
}

interface UseGetPostsParams<Data> {
  queryClient: QueryClient;
  page: number;
  select?: (data: QueryFnGetPostsOutput) => Data;
}

export function useGetPosts<T = QueryFnGetPostsOutput>({
  queryClient,
  page,
  select,
}: UseGetPostsParams<T>) {
  return useQuery(
    {
      queryKey: ['posts', page],
      queryFn: () =>
        queryFnGetPosts({
          page,
          limit: 10,
          sticky: false,
        }),
      select,
    },
    queryClient,
  );
}

type QueryFnGetPostsOutput = Awaited<ReturnType<typeof queryFnGetPosts>>;

interface ParamsType {
  limit: number;
  page: number;
  sticky: boolean;
}
async function queryFnGetPosts({ limit, page, sticky }: ParamsType) {
  const cb = async () => wpPosts.perPage(limit).page(page).sticky(sticky).order('desc');
  const response = await makeWpApiCall<PostType[]>(cb());

  if (response) {
    const posts: Record<number, PostType> = response.reduce(
      (acc, current) => ({
        ...acc,
        [current.id]: current,
      }),
      {},
    );

    return {
      posts,
      postIds: response.map((post) => post.id),
    };
  }

  return {
    posts: {},
    postIds: [],
  };
}
