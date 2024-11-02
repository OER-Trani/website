import type { PostType } from './post';

export interface PageType extends PostType {
  menu_order: number;
}
