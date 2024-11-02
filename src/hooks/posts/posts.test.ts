// @vitest-environment jsdom
import { QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { useGetPost, useGetPosts, useGetStickyPosts } from '.';
import { getWpPost, getWpPosts } from '../../lib/wp-rest-api';
import { PostType } from '../../lib/wpapi/types/post';

vi.mock('../../lib/wp-rest-api', () => ({
  getWpPost: vi.fn(),
  getWpPosts: vi.fn(),
}));

const mockPostsResponse: PostType[] = [
  {
    id: 1,
    title: 'Post 1',
  },
  {
    id: 2,
    title: 'Post 2',
  },
  {
    id: 3,
    title: 'Post 3',
  },
  {
    id: 4,
    title: 'Post 4',
  },
] as unknown as PostType[];

describe('useGetStickyPosts', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient();
    (getWpPosts as Mock).mockResolvedValue(mockPostsResponse);
  });

  it('should fetch sticky posts successfully', async () => {
    // act
    const { result } = renderHook(() => useGetStickyPosts({ queryClient }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data?.postIds).toEqual([1, 2, 3, 4]);
    expect(result.current.data?.posts?.[1]).toEqual(mockPostsResponse[0]);
  });

  it('should return null if the sticky posts fetch fails', async () => {
    // arrange
    (getWpPosts as Mock).mockResolvedValue(null);
    // act
    const { result } = renderHook(() => useGetStickyPosts({ queryClient }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data?.postIds).toEqual([]);
    expect(result.current.data?.posts).toEqual({});
  });
});

describe('useGetPosts', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient();
    (getWpPosts as Mock).mockResolvedValue(mockPostsResponse);
  });

  it('should fetch sticky posts successfully', async () => {
    // act
    const { result } = renderHook(() => useGetPosts({ queryClient, page: 1 }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data?.postIds).toEqual([1, 2, 3, 4]);
    expect(result.current.data?.posts?.[1]).toEqual(mockPostsResponse[0]);
  });

  it('should return null if the sticky posts fetch fails', async () => {
    // arrange
    (getWpPosts as Mock).mockResolvedValue(null);
    // act
    const { result } = renderHook(() => useGetPosts({ queryClient, page: 1 }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data?.postIds).toEqual([]);
    expect(result.current.data?.posts).toEqual({});
  });
});

describe('useGetPost', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient();
    (getWpPost as Mock).mockResolvedValue(mockPostsResponse[0]);
  });

  it('should fetch a post', async () => {
    // act
    const { result } = renderHook(() => useGetPost({ queryClient, id: mockPostsResponse[0].id }));
    // assert
    await waitFor(() => expect(result.current).toBeTruthy());
    expect(result.current).toEqual(mockPostsResponse[0]);
  });

  it('should return null if the fetch fails', async () => {
    // arrange
    (getWpPost as Mock).mockResolvedValue(null);
    // act
    const { result } = renderHook(() => useGetPost({ queryClient, id: mockPostsResponse[0].id }));
    // assert
    await waitFor(() => expect(result.current).toBeNull());
  });

  it('should return the cached post if any', async () => {
    // arrange
    (getWpPost as Mock).mockResolvedValue(null);
    queryClient.setQueryData(['posts'], {
      posts: mockPostsResponse.reduce((acc, post) => ({ ...acc, [post.id]: post }), {}),
      postIds: mockPostsResponse.map((post) => post.id),
    });
    // act
    const { result } = renderHook(() => useGetPost({ queryClient, id: mockPostsResponse[0].id }));
    // assert
    await waitFor(() => expect(result.current).toBeTruthy());
    expect(result.current).toEqual(mockPostsResponse[0]);
  });
});
