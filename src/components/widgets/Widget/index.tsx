/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useWidget } from '../../../hooks/widgets';
import { queryClient } from '../../../lib/react-query/constants';
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
  id: number;
}

export default function WidgetComponent({ id }: WidgetComponentProps) {
  const { data: widget } = useWidget({ id, enabled: true, queryClient });
  const type = widget && getWidgetType(widget);
  // const childrenComponent = TODO
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
