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

export interface Guid {
  rendered: string;
}

export interface Title {
  rendered: string;
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

export interface Links {
  self: Self[];
  collection: Collection[];
  about: About[];
  'version-history': VersionHistory[];
  'predecessor-version': PredecessorVersion[];
  'wp:attachment': WpAttachment[];
  curies: Cury[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface About {
  href: string;
}

export interface VersionHistory {
  count: number;
  href: string;
}

export interface PredecessorVersion {
  id: number;
  href: string;
}

export interface WpAttachment {
  href: string;
}

export interface Cury {
  name: string;
  href: string;
  templated: boolean;
}
