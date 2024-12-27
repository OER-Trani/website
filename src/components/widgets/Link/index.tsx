import { Link } from '../../../lib/wp-rest-api/types/widgets';

export default function LinkWidgetComponent({ text, url }: Link) {
  return (
    <a href={url} target="_blank">
      {text}
    </a>
  );
}
