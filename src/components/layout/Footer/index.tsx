import { useWidgets } from '../../../hooks/widgets';
import { queryClient } from '../../../lib/react-query/constants';
import WidgetComponent from '../../widgets/Widget';
import styles from './styles.module.css';

export default function Footer() {
  const { data } = useWidgets({ enabled: true, queryClient });
  const widgetIds = data?.widgetIdsByPosition['fondo pagina'];

  return (
    <footer className={`${styles.f}`}>
      <div className={`container`}>
        {widgetIds?.map((widget) => <WidgetComponent key={widget} id={widget} />)}
      </div>
    </footer>
  );
}
