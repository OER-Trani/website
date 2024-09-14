// @vitest-environment jsdom
import { QueryClient } from '@tanstack/react-query';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { useWidget, useWidgets } from '.';
import type { WidgetPostType } from '../../lib/wpapi/types/widgets';
import { renderHook, waitFor } from '@testing-library/react';
import * as getWidgetsMock from '../../lib/wpapi/features/widgets';

const mockWidgetsResponse = [
  {
    id: 1,
    title: 'Widget 1',
    acf: {
      position: 'intestazione',
    },
  },
  {
    id: 2,
    title: 'Widget 2',
    acf: {
      position: 'fondo pagina',
    },
  },
  {
    id: 3,
    title: 'Widget 3',
    acf: {
      position: 'fondo pagina',
    },
  },
] as unknown as WidgetPostType[];

describe('useWidgets', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient();
    vi.spyOn(getWidgetsMock, 'getWidgets').mockResolvedValue(mockWidgetsResponse);
  });

  it('should return widgets grouped by position when enabled is true', async () => {
    // act
    const { result } = renderHook(() => useWidgets({ enabled: true, queryClient }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    const { data } = result.current;
    expect(data?.widgetsByPosition).toEqual({
      intestazione: [mockWidgetsResponse[0]],
      'fondo pagina': [mockWidgetsResponse[2], mockWidgetsResponse[1]],
      'colonna laterale': [],
    });
    expect(data?.widgets).toEqual(mockWidgetsResponse);
  });

  it('should return empty data when the response is null', async () => {
    // arrange
    vi.spyOn(getWidgetsMock, 'getWidgets').mockResolvedValue(null);
    // act
    const { result } = renderHook(() => useWidgets({ enabled: true, queryClient }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    const { data } = result.current;
    expect(data?.widgetsByPosition).toEqual({
      intestazione: [],
      'fondo pagina': [],
      'colonna laterale': [],
    });
    expect(data?.widgets).toEqual([]);
  });

  it('should not fetch widgets when enabled is false', async () => {
    // act
    const { result } = renderHook(() => useWidgets({ enabled: false, queryClient }));
    // assert
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});

describe('useWidget', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient();
    vi.spyOn(getWidgetsMock, 'getWidgets').mockResolvedValue(mockWidgetsResponse);
  });

  it('should return only the required widget', async () => {
    // arrange
    const id = mockWidgetsResponse[0].id;
    // act
    const { result } = renderHook(() => useWidget({ enabled: true, queryClient, id }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toEqual(mockWidgetsResponse[0]);
  });
});
