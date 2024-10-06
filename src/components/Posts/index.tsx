import { useState } from 'react';
import { useGetPosts } from '../../hooks/posts';
import { queryClient } from '../../lib/react-query/constants';
import Post from '../Post';

export default function Posts() {
  const [page, setPage] = useState(1);
  const { data } = useGetPosts({ queryClient, page });
  return (
    <section>
      <ul>{data?.postIds.map((id) => <Post key={id} id={id} page={page} showExcerpt={true} />)}</ul>
      <div>
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
      </div>
    </section>
  );
}
