import type { Guid, Links, Title } from './post';

export interface WidgetPostType {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Title;
  template: string;
  meta: Meta;
  class_list: string[];
  acf: Acf;
  _links: Links;
}

export interface Meta {
  _acf_changed: boolean;
}

export interface Acf {
  text: Text;
  link: Link;
  image: Image;
  parent_widget_id: number[] | null | '';
  show_title: boolean;
  position: 'fondo pagina' | 'colonna laterale' | 'intestazione';
}

export interface Text {
  text: string;
}

export interface Link {
  text: string;
  url: string;
}

export interface Image {
  text: string;
  image_id: number;
}
