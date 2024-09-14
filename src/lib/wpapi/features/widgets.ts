import type WPAPI from 'wpapi';
import wpClient from '../client';
import { WidgetPostType } from '../types/widgets';

wpClient.widgets = wpClient.registerRoute('wp/v2', '/widgets', {
  params: ['before', 'after', 'post', 'status', 'per_page'],
});

export const widgets = wpClient.widgets() as WPAPI.WPRequest;

export async function getWidgets(widgets: WPAPI.WPRequest): Promise<WidgetPostType[] | null> {
  try {
    const items = await widgets.status('publish').per_page('100');
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getWidget(
  widgets: WPAPI.WPRequest,
  id: number,
): Promise<WidgetPostType | null> {
  try {
    const item = await widgets.post(id);
    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
}
