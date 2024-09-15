import { useWidgets } from '../../../hooks/widgets';
import { queryClient } from '../../../lib/react-query/constants';
import WidgetComponent from '../../widgets/Widget';
import styles from './styles.module.css';

export default function Aside() {
  const { data } = useWidgets({ enabled: true, queryClient });
  const widgets = data?.widgetsByPosition['colonna laterale'];

  return (
    <aside className={styles.a}>
      {widgets?.map((widget) => <WidgetComponent key={widget.id} widget={widget} />)}
    </aside>
  );
}
