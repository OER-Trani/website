import { useMemo, useState } from 'react';
import { useGetPosts } from '../../hooks/posts';
import { queryClient } from '../../lib/react-query/constants';
import sanitizePostContent from '../../lib/sanitize-html';

export default function Posts() {
  const [page, setPage] = useState(1);
  const { data } = useGetPosts({ queryClient, page });
  return (
    <section>
      <ul>{data?.postIds.map((id) => <Post key={id} id={id} page={page} />)}</ul>
      <ol>
        <button
          type="button"
          onClick={() => setPage((page) => page - 1)}
          aria-disabled={page === 1}
        >
          Indietro
        </button>
        <button type="button" onClick={() => setPage((page) => page + 1)}>
          Avanti
        </button>
      </ol>
    </section>
  );
}

interface PostProps {
  id: number;
  page: number;
}

function Post({ id, page }: PostProps) {
  const { data } = useGetPosts({ queryClient, page });
  const post = data?.posts[id];
  const sanizedContent = useMemo(
    () => post?.content.rendered && sanitizePostContent(post.content.rendered),
    [post?.content.rendered],
  );

  if (!post || !sanizedContent) {
    return null;
  }

  return (
    <li>
      <article>
        <h2>{post.title.rendered}</h2>
        <div dangerouslySetInnerHTML={{ __html: sanizedContent }} />
      </article>
    </li>
  );
}
