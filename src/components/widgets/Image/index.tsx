import { useGetMedia } from '../../../hooks/media';
import { Image } from '../../../lib/wp-rest-api/types/widgets';

export default function ImageWidgetComponent({ text, image_id }: Image) {
  const { data } = useGetMedia({ id: image_id });
  const image_url = data?.source_url;
  const height = data?.media_details.height;
  const width = data?.media_details.width;

  if (!image_url) return null;

  return <img src={image_url} alt={text} height={height} width={width} />;
}
