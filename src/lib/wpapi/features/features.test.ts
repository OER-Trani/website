import { describe, it, expect, vi } from 'vitest';
import type WPAPI from 'wpapi';

describe.each([
  {
    description: 'getCategories',
    responseOk: [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ],
    responeKO: null,
  },
])('$description', ({ responseOk, responseKO }) => {
  it('should return items when the API call is successful', async () => {
    const clientMock = {
      categories: vi.fn().mockResolvedValue(responseOk),
    } as unknown as WPAPI;

    const result = await getCategories(clientMock);

    expect(result).toEqual(mockResponse);
    expect(clientMock.categories).toHaveBeenCalled();
  });
});
