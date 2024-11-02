// @vitest-environment jsdom
import { QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { useWidget, useWidgetChildrenIds, useWidgets } from '.';
import { getWpWidgets } from '../../lib/wp-rest-api';
import type { WidgetPostType } from '../../lib/wp-rest-api/types/widgets';

vi.mock('../../lib/wp-rest-api', () => ({
  getWpWidgets: vi.fn(),
}));

const mockWidgetsResponse: WidgetPostType[] = [
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
  {
    id: 4,
    title: 'Widget 4',
    acf: {
      position: 'fondo pagina',
      parent_widget_id: [3],
    },
  },
] as unknown as WidgetPostType[];

let queryClient: QueryClient;
beforeEach(() => {
  vi.clearAllMocks();
  queryClient = new QueryClient();
  (getWpWidgets as Mock).mockResolvedValue(mockWidgetsResponse);
});

describe('useWidgets', () => {
  it('should return widgets grouped by position when enabled is true', async () => {
    // act
    const { result } = renderHook(() => useWidgets({ enabled: true, queryClient }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    const { data } = result.current;
    expect(data?.widgetIdsByPosition).toEqual({
      intestazione: [mockWidgetsResponse[0].id],
      'fondo pagina': [mockWidgetsResponse[2].id, mockWidgetsResponse[1].id],
      'colonna laterale': [],
    });
    expect(data?.widgets).toEqual(mockWidgetsResponse);
  });

  it('should return widgets grouped by parent ID when enabled is true', async () => {
    // act
    const { result } = renderHook(() => useWidgets({ enabled: true, queryClient }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    const { data } = result.current;
    expect(data?.widgetIdsByParentId).toEqual({
      3: [mockWidgetsResponse[3].id],
    });
  });

  it('should return empty data when the response is null', async () => {
    // arrange
    (getWpWidgets as Mock).mockResolvedValue(null);
    // act
    const { result } = renderHook(() => useWidgets({ enabled: true, queryClient }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    const { data } = result.current;
    expect(data?.widgetIdsByPosition).toEqual({
      intestazione: [],
      'fondo pagina': [],
      'colonna laterale': [],
    });
    expect(data?.widgets).toEqual([]);
    expect(data?.widgetIdsByParentId).toEqual({});
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

describe('useWidgetChildrenIds', () => {
  it("should return only the required widget' children", async () => {
    // arrange
    const id = mockWidgetsResponse[2].id;
    // act
    const { result } = renderHook(() => useWidgetChildrenIds({ enabled: true, queryClient, id }));
    // assert
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toEqual([mockWidgetsResponse[3].id]);
  });
});
