/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useWidgets } from '../../../hooks/widgets';
import { queryClient } from '../../../lib/react-query/constants';
import { getWidgetType } from '../../../utils/widgets';
import ImageWidgetComponent from '../../widgets/Image';
import LinkWidgetComponent from '../../widgets/Link';
import TextWidgetComponent from '../../widgets/Text';
import styles from './styles.module.css';

const componentMap = {
  image: ImageWidgetComponent,
  link: LinkWidgetComponent,
  text: TextWidgetComponent,
};

export default function Header() {
  const { data } = useWidgets({ enabled: true, queryClient });
  const widgets = data?.widgetsByPosition.intestazione;
  return (
    <header className={styles.h}>
      {widgets?.map((widget) => {
        const type = getWidgetType(widget);
        if (!type) return null;
        const Component = componentMap[type];
        const props = widget.acf[type];
        // @ts-ignore
        return <Component {...props} key={widget.id} />;
      })}
    </header>
  );
}
