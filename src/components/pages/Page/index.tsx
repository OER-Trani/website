import { useMemo } from 'react';
import { useGetPages } from '../../../hooks/pages';
import { queryClient } from '../../../lib/react-query/constants';
import sanitizePostContent from '../../../lib/sanitize-html';
import { Route } from '../../../routes/pages.$id.$slug';

export default function PageDetail() {
  const id = +Route.useParams().id;
  const { data: { pages = {} } = {} } = useGetPages({ queryClient });
  const page = pages[id];
  const sanizedContent = useMemo(
    () => sanitizePostContent(page.content.rendered),
    [page.content.rendered],
  );

  if (!page) return null;

  return (
    <article>
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: sanizedContent }} />
    </article>
  );
}
