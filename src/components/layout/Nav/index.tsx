import { useGetPageBySlug, useGetPages } from '../../../hooks/pages';
import { queryClient } from '../../../lib/react-query/constants';

export default function Nav() {
  const { data: { pageSlugs = [] } = {} } = useGetPages({ queryClient });

  return (
    <nav>
      <a href="/posts">Notizie</a>
      {pageSlugs.map((slug) => (
        <PageNavItem key={slug} slug={slug} />
      ))}
    </nav>
  );
}

function PageNavItem({ slug }: { slug: string }) {
  const { data: page } = useGetPageBySlug({ slug, queryClient });

  return <a href={'/page/' + slug}>{page?.title.rendered}</a>;
}
