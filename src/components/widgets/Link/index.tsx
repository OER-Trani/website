import { Link } from '../../../lib/wpapi/types/widgets';

export default function LinkWidgetComponent({ text, url }: Link) {
  return <a href={url}>{text}</a>;
}
