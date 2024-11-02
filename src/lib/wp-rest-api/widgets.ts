import { mapPath } from './constants';
import type { WidgetPostType } from './types/widgets';
import { convertObjectInSearchParams, fetchWpRestApi } from './utils';

interface GetWidgetsParams {
  params: {
    per_page: number;
    order?: 'asc' | 'desc';
  };
  path?: string;
}

export async function getWpWidgets({ params, path = mapPath.widgets }: GetWidgetsParams) {
  const widgets = await fetchWpRestApi<WidgetPostType[]>({
    path,
    params: new URLSearchParams(convertObjectInSearchParams(params)),
  });

  return widgets;
}
