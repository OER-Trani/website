import { useGetPage, useGetPages } from '../../../hooks/pages';
import { queryClient } from '../../../lib/react-query/constants';

export default function Nav() {
  const { data: { pageIds = [] } = {} } = useGetPages({ queryClient });

  return (
    <nav>
      <a href="/posts">Notizie</a>
      {pageIds.map((id) => (
        <PageNavItem key={id} id={id} />
      ))}
    </nav>
  );
}

function PageNavItem({ id }: { id: number }) {
  const { data: page } = useGetPage({ id, queryClient });

  return <a href={'/page/' + id}>{page?.title.rendered}</a>;
}
