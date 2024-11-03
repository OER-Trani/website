import { Link } from '@tanstack/react-router';
import { useGetPageBySlug, useGetPages } from '../../../hooks/pages';
import { queryClient } from '../../../lib/react-query/constants';
import styles from './styles.module.css';

export default function Nav() {
  const { data: { pageSlugs = [] } = {} } = useGetPages({ queryClient });

  return (
    <div className={styles.w}>
      <nav className="container">
        <Link href="/posts">Notizie</Link>
        {pageSlugs.map((slug) => (
          <PageNavItem key={slug} slug={slug} />
        ))}
      </nav>
    </div>
  );
}

function PageNavItem({ slug }: { slug: string }) {
  const { data: page } = useGetPageBySlug({ slug, queryClient });

  return <Link href={'/page/' + slug}>{page?.title.rendered}</Link>;
}
