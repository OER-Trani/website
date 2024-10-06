import { useWidgets } from '../../../hooks/widgets';
import { queryClient } from '../../../lib/react-query/constants';
import WidgetComponent from '../../widgets/Widget';
import styles from './styles.module.css';

export default function Aside() {
  const { data } = useWidgets({ enabled: true, queryClient });
  const widgetIds = data?.widgetIdsByPosition['colonna laterale'];

  return (
    <aside className={styles.a}>
      {widgetIds?.map((widget) => (
        <section className={styles.s}>
          <WidgetComponent key={widget} id={widget} />
        </section>
      ))}
    </aside>
  );
}
