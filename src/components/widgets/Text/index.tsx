import type { Text } from '../../../lib/wp-rest-api/types/widgets';

export default function TextWidgetComponent({ text }: Text) {
  return <p>{text}</p>;
}
