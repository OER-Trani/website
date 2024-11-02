import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getWpPost, getWpPosts } from './posts';
import { getWpWidgets } from './widgets';

global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getWpPosts', () => {
  it('should fetch the correct URL', async () => {
    const path = '/posts';
    await getWpPosts({
      params: {
        page: 1,
        per_page: 10,
        order: 'asc',
        sticky: true,
      },
      path,
    });
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost/wp-json/posts?page=1&per_page=10&order=asc&sticky=1`,
    );
  });
});

describe('getWpPost', () => {
  it('should fetch the correct URL', async () => {
    const path = '/posts';
    await getWpPost({
      id: 1,
      path,
    });
    expect(global.fetch).toHaveBeenCalledWith(`http://localhost/wp-json${path}/1?`);
  });
});

describe('getWpWidgets', () => {
  it('should fetch the correct URL', async () => {
    const path = '/widgets';
    await getWpWidgets({
      params: {
        per_page: 10,
        order: 'asc',
      },
      path,
    });
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost/wp-json/widgets?per_page=10&order=asc`,
    );
  });
});
