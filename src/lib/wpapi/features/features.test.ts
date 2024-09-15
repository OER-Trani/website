import { describe, expect, it, vi } from 'vitest';
import type WPAPI from 'wpapi';
import { getCategories } from './categories';
import { getMedia } from './media';
import { getPost, getPosts } from './posts';

describe.each([
  {
    description: 'getCategories',
    mockMethod: 'categories',
    method: getCategories,
    responseOk: [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ],
    responseKO: null,
  },
  {
    description: 'getPosts',
    mockMethod: 'posts',
    method: getPosts,
    responseOk: [
      { id: 1, name: 'Post 1' },
      { id: 2, name: 'Post 2' },
    ],
    responseKO: null,
  },
])('$description', ({ responseOk, responseKO, mockMethod, method }) => {
  it('should return items when the API call is successful', async () => {
    const clientMock = {
      [mockMethod]: vi.fn().mockResolvedValue(responseOk),
    } as unknown as WPAPI;

    const result = await method(clientMock);

    expect(result).toEqual(responseOk);
  });

  it('should return null when the API call is not successful', async () => {
    const clientMock = {
      [mockMethod]: vi.fn().mockRejectedValue(new Error('fake')),
    } as unknown as WPAPI;

    const result = await method(clientMock);

    expect(result).toEqual(responseKO);
  });
});

describe.each([
  {
    description: 'getPost',
    mockMethod: 'posts',
    method: getPost,
    responseOk: { id: 1, name: 'Post 1' },
    responseKO: null,
  },
  {
    description: 'getMedia',
    mockMethod: 'media',
    method: getMedia,
    responseOk: { id: 1, name: 'Media 1' },
    responseKO: null,
  },
])('$description', ({ responseOk, responseKO, mockMethod, method }) => {
  it('should return an item when the API call is successful', async () => {
    const clientMock = {
      [mockMethod]: () => ({
        id: vi.fn().mockResolvedValue(responseOk),
      }),
    } as unknown as WPAPI;

    const result = await method(clientMock, 1);

    expect(result).toEqual(responseOk);
  });

  it('should return null when the API call is not successful', async () => {
    const clientMock = {
      [mockMethod]: () => ({
        id: vi.fn().mockRejectedValue(new Error('fake')),
      }),
    } as unknown as WPAPI;

    const result = await method(clientMock, 1);

    expect(result).toEqual(responseKO);
  });
});
