import { mapPath } from './constants';
import { fetchWpRestApi, convertObjectInSearchParams } from './utils';

interface GetPostsParams {
  params: {
    per_page: number;
    order: 'asc' | 'desc';
    page: number;
    sticky?: boolean;
  };
  path?: string;
}

export async function getWpPosts<T>({ params, path = mapPath.posts }: GetPostsParams) {
  const posts = await fetchWpRestApi<T[]>({
    path,
    params: new URLSearchParams(convertObjectInSearchParams(params)),
  });

  return posts;
}

export async function getWpPost<T>({ id, path = mapPath.posts }: { id: number; path?: string }) {
  const posts = await fetchWpRestApi<T>({
    path: `${path}/${id}`,
    params: new URLSearchParams(),
  });

  return posts;
}
