import { mapPath } from './constants';
import { PostType } from './types/post';
import { fetchWpRestApi, convertObjectInSearchParams } from './utils';

interface GetPostsParams {
  params: {
    per_page: number;
    order: 'asc' | 'desc';
    page: number;
    sticky: boolean;
  };
  path?: string;
}

export async function getWpPosts({ params, path = mapPath.posts }: GetPostsParams) {
  const posts = await fetchWpRestApi<PostType[]>({
    path,
    params: new URLSearchParams(convertObjectInSearchParams(params)),
  });

  return posts;
}

export async function getWpPost({ id, path = mapPath.posts }: { id: number; path?: string }) {
  const posts = await fetchWpRestApi<PostType[]>({
    path: `${path}/${id}`,
    params: new URLSearchParams(),
  });

  return posts;
}
