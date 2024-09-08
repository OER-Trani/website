import type WPAPI from 'wpapi';
import wpClient from './client';

wpClient.widgets = wpClient.registerRoute('wp/v2', '/widgets', {
  params: ['before', 'after', 'post', 'status'],
});

export const widgets = wpClient.widgets() as WPAPI.WPRequest;

export async function getWidgets(widgets: WPAPI.WPRequest) {
  try {
    const items = await widgets.status('publish');
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getWidget(widgets: WPAPI.WPRequest, id: number) {
  try {
    const item = await widgets.post(id);
    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
}
