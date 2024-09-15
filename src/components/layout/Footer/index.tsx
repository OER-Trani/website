import { useWidgets } from '../../../hooks/widgets';
import { queryClient } from '../../../lib/react-query/constants';
import WidgetComponent from '../../widgets/Widget';
import styles from './styles.module.css';

export default function Footer() {
  const { data } = useWidgets({ enabled: true, queryClient });
  const widgets = data?.widgetsByPosition['fondo pagina'];
  return (
    <footer className={styles.f}>
      {widgets?.map((widget) => <WidgetComponent key={widget.id} widget={widget} />)}
    </footer>
  );
}
