import { describe, it, expect, vi } from 'vitest';
import type WPAPI from 'wpapi';
import { getCategories } from './categories';

describe('getCategories', () => {
  it('should return categories when the API call is successful', async () => {
    const mockResponse = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];

    const clientMock = {
      categories: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as WPAPI;

    const result = await getCategories(clientMock);

    expect(result).toEqual(mockResponse);
    expect(clientMock.categories).toHaveBeenCalled();
  });

  it('should return null and log an error if the API call fails', async () => {
    const clientMock = {
      categories: vi.fn().mockRejectedValue(new Error('API Error')),
    } as unknown as WPAPI;

    const result = await getCategories(clientMock);

    expect(result).toBeNull();
    expect(clientMock.categories).toHaveBeenCalled();
  });
});
