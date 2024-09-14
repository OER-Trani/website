import type { WidgetPostType } from '../../lib/wpapi/types/widgets';

export function getWidgetType(data: WidgetPostType) {
  if (data.acf.text.text) {
    return 'text';
  }
  if (data.acf.image.image_id) {
    return 'image';
  }
  if (data.acf.link.url) {
    return 'link';
  }
  return null;
}

export function isChild(data: WidgetPostType) {
  return !!data.acf.parent_widget_id;
}
