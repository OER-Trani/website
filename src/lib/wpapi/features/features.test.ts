import { describe, expect, it } from 'vitest';
import { makeWpApiCall } from '.';
import { wpCategories } from './categories';
import { wpMedia } from './media';
import { wpPages } from './pages';
import { wpPosts } from './posts';

describe('makeWpApiCall', () => {
  it('should return the result of the resolved promise', async () => {
    // arrange
    const mockApiCall = Promise.resolve('Success');
    // act
    const result = await makeWpApiCall(mockApiCall);
    // assert
    expect(result).toBe('Success');
  });

  it('should return null when the promise rejects', async () => {
    // arrange
    const mockError = new Error('API error');
    const mockApiCall = Promise.reject(mockError);
    // act
    const result = await makeWpApiCall(mockApiCall);
    // assert
    expect(result).toBeNull();
  });
});

describe.each([
  { desc: 'media', wpClient: wpMedia, method: 'id' },
  { desc: 'categories', wpClient: wpCategories, method: 'id' },
  { desc: 'posts', wpClient: wpPosts, method: 'id' },
  { desc: 'pages', wpClient: wpPages, method: 'id' },
])('wpClient: $desc', ({ wpClient, method }) => {
  it('should include the method', () => {
    expect(wpClient[method]).toBeDefined();
  });
});
