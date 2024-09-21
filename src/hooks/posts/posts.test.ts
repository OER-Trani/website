// @vitest-environment jsdom
import { QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGetPosts, useGetStickyPosts } from '.';
import * as mock from '../../lib/wpapi/features';
import { PostType } from '../../lib/wpapi/types/post';

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
    vi.spyOn(mock, 'makeWpApiCall').mockResolvedValue(mockPostsResponse);
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
    vi.spyOn(mock, 'makeWpApiCall').mockResolvedValue(null);
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
    vi.spyOn(mock, 'makeWpApiCall').mockResolvedValue(mockPostsResponse);
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
    vi.spyOn(mock, 'makeWpApiCall').mockResolvedValue(null);
    // act
    const { result } = renderHook(() => useGetPosts({ queryClient, page: 1 }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data?.postIds).toEqual([]);
    expect(result.current.data?.posts).toEqual({});
  });
});
