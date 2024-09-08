// @vitest-environment node
import type WPAPI from 'wpapi';
import { describe, it, expect, vi } from 'vitest';
import { getWidget, getWidgets } from './widgets';

describe('getWidgets', () => {
  it('should return published widgets', async () => {
    const mockResponse = [
      { id: 1, title: 'Widget 1', status: 'publish' },
      { id: 2, title: 'Widget 2', status: 'publish' },
    ];
    const widgetsMock = {
      status: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as WPAPI.WPRequest;

    const result = await getWidgets(widgetsMock);

    expect(result).toEqual(mockResponse);
  });

  it('should return null if there is an error', async () => {
    const widgetsMock = {
      status: vi.fn().mockRejectedValue(new Error('API Error')),
    } as unknown as WPAPI.WPRequest;

    const result = await getWidgets(widgetsMock);

    expect(result).toBeNull();
  });
});

describe('getWidget', () => {
  it('should return the widget with the specified ID', async () => {
    const mockResponse = { id: 1, title: 'Widget 1', status: 'publish' };
    const widgetsMock = {
      post: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as WPAPI.WPRequest;

    const result = await getWidget(widgetsMock, 1);

    expect(result).toEqual(mockResponse);
    expect(widgetsMock.post).toHaveBeenCalledWith(1);
  });

  it('should return null if the widget is not found (error scenario)', async () => {
    const widgetsMock = {
      post: vi.fn().mockRejectedValue(new Error('Widget not found')),
    } as unknown as WPAPI.WPRequest;

    const result = await getWidget(widgetsMock, 999);

    expect(result).toBeNull();
    expect(widgetsMock.post).toHaveBeenCalledWith(999);
  });

  it('should return null if there is any other error', async () => {
    const widgetsMock = {
      post: vi.fn().mockRejectedValue(new Error('API Error')),
    } as unknown as WPAPI.WPRequest;

    const result = await getWidget(widgetsMock, 1);

    expect(result).toBeNull();
    expect(widgetsMock.post).toHaveBeenCalledWith(1);
  });
});
