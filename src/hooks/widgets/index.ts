/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getWidgets, widgets } from '../../lib/wpapi/features/widgets';
import type { WidgetPostType } from '../../lib/wpapi/types/widgets';

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
  widgetsByPosition: Record<WidgetPostType['acf']['position'], WidgetPostType[]>;
  widgets: WidgetPostType[];
}

async function queryFnGetWidgets(): Promise<QueryFnGetWidgetsOutput> {
  let widgetsByPosition = {
    intestazione: [],
    'fondo pagina': [],
    'colonna laterale': [],
  };
  const widgetsResponse = await getWidgets(widgets);
  if (widgetsResponse) {
    widgetsByPosition = widgetsResponse.reduce((acc, widgetData) => {
      const position = widgetData.acf.position;
      if (acc[position].length) {
        return {
          ...acc,
          [position]: [widgetData, ...acc[position]],
        };
      }
      return {
        ...acc,
        [position]: [widgetData],
      };
    }, widgetsByPosition);
    return { widgetsByPosition, widgets: widgetsResponse };
  }
  return { widgetsByPosition, widgets: [] };
}
