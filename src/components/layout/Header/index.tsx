import { useWidgets } from '../../../hooks/widgets';
import { queryClient } from '../../../lib/react-query/constants';
import WidgetComponent from '../../widgets/Widget';
import styles from './styles.module.css';

export default function Header() {
  const { data } = useWidgets({ enabled: true, queryClient });
  const widgetIds = data?.widgetIdsByPosition['intestazione'];

  return (
    <header className={styles.h}>
      <div className={styles.r1}>
        <h1>OER Trani</h1>
        <a href="/login">Accedi</a>
      </div>
      <div className={styles.r2}>
        {widgetIds?.map((widget) => <WidgetComponent key={widget} id={widget} />)}
      </div>
    </header>
  );
}
