/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { WidgetPostType } from '../../../lib/wpapi/types/widgets';
import { getWidgetType } from '../../../utils/widgets';
import ImageWidgetComponent from '../Image';
import LinkWidgetComponent from '../Link';
import TextWidgetComponent from '../Text';

const componentMap = {
  image: ImageWidgetComponent,
  link: LinkWidgetComponent,
  text: TextWidgetComponent,
};

interface WidgetComponentProps {
  widget: WidgetPostType;
}

export default function WidgetComponent({ widget }: WidgetComponentProps) {
  const type = getWidgetType(widget);
  if (!type) return null;
  const Component = componentMap[type];
  const props = widget.acf[type];
  return (
    <>
      {widget.acf.show_title ? <h3>{widget.title.rendered}</h3> : null}
      {
        // @ts-ignore
        <Component {...props} key={widget.id} />
      }
    </>
  );
}
