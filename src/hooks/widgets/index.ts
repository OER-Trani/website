/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getWidgets, widgets } from '../../lib/wpapi/features/widgets';
import type { WidgetPostType } from '../../lib/wpapi/types/widgets';
import { isChild } from '../../utils/widgets';

interface UseWidgetParams {
  enabled: boolean;
  id: number;
  queryClient: QueryClient;
}

export function useWidget({ enabled, id, queryClient }: UseWidgetParams) {
  const select = (data: QueryFnGetWidgetsOutput) => data.widgets.find((widget) => widget.id === id);
  // @ts-expect-error
  return useWidgets<WidgetPostType>({ enabled, select, queryClient });
}

export function useWidgetChildrenIds({ enabled, id, queryClient }: UseWidgetParams) {
  const select = (data: QueryFnGetWidgetsOutput) => data.widgetIdsByParentId[id];
  return useWidgets<number[]>({ enabled, select, queryClient });
}

interface UseWidgetsParams<Data> {
  enabled: boolean;
  queryClient: QueryClient;
  select?: (data: QueryFnGetWidgetsOutput) => Data;
}

export function useWidgets<TData = QueryFnGetWidgetsOutput>({
  enabled,
  queryClient,
  select,
}: UseWidgetsParams<TData>) {
  return useQuery(
    {
      enabled,
      queryKey: ['widgets'],
      queryFn: queryFnGetWidgets,
      select,
    },
    queryClient,
  );
}

export interface QueryFnGetWidgetsOutput {
  widgetIdsByPosition: Record<WidgetPostType['acf']['position'], number[]>;
  widgets: WidgetPostType[];
  widgetIdsByParentId: Record<number, number[]>;
}

async function queryFnGetWidgets(): Promise<QueryFnGetWidgetsOutput> {
  let output = {
    widgetIdsByPosition: {
      intestazione: [],
      'fondo pagina': [],
      'colonna laterale': [],
    },
    widgetIdsByParentId: {} as QueryFnGetWidgetsOutput['widgetIdsByParentId'],
  };
  const widgetsResponse = await getWidgets(widgets);
  if (widgetsResponse) {
    output = widgetsResponse.reduce((acc, widgetData) => {
      const id = widgetData.id;
      const position = widgetData.acf.position;
      const isParent = !isChild(widgetData);

      if (isParent) {
        return {
          ...acc,
          widgetIdsByPosition: {
            ...acc.widgetIdsByPosition,
            [position]: [id, ...(acc.widgetIdsByPosition[position] || [])],
          },
        };
      } else {
        const parents = (widgetData.acf.parent_widget_id || []).reduce(
          (init, parentId) => ({
            ...init,
            [parentId]: [id, ...(acc.widgetIdsByParentId[parentId] || [])],
          }),
          {},
        );

        return {
          ...acc,
          widgetIdsByParentId: {
            ...acc.widgetIdsByParentId,
            ...parents,
          },
        };
      }
    }, output);

    return {
      widgetIdsByPosition: output.widgetIdsByPosition,
      widgets: widgetsResponse,
      widgetIdsByParentId: output.widgetIdsByParentId,
    };
  }
  return { widgetIdsByPosition: output.widgetIdsByPosition, widgets: [], widgetIdsByParentId: {} };
}
