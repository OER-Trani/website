import type { Text } from '../../../lib/wpapi/types/widgets';

export default function TextWidgetComponent({ text }: Text) {
  return <p>{text}</p>;
}
