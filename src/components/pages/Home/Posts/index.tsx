import { useState } from 'react';
import { useGetPosts } from '../../../../hooks/posts';
import { queryClient } from '../../../../lib/react-query/constants';
import Post from '../../../Post';
import homeStyles from '../styles.module.css';

export default function Posts() {
  const [page, setPage] = useState(1);
  const { data } = useGetPosts({ queryClient, page });

  return (
    <section className={homeStyles.posts}>
      <h2>Ultimi articoli</h2>
      <ul className={homeStyles.list}>
        {data?.postIds.map((id) => (
          <PostContainer key={id} id={id} page={page} showExcerpt={true} />
        ))}
      </ul>
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

interface PostProps {
  id: number;
  page: number;
  showExcerpt?: boolean;
}

function PostContainer({ id, page, showExcerpt }: PostProps) {
  const { data } = useGetPosts({ queryClient, page });
  const post = data?.posts[id];

  return <Post showExcerpt={!!showExcerpt} post={post} />;
}
