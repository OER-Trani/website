import { useState } from 'react';
import { useGetPosts } from '../../../hooks/posts';
import { queryClient } from '../../../lib/react-query/constants';
import Loader from '../../Loader';
import Post from '../../Post';
import styles from './styles.module.css';

export default function PostsContainer() {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetPosts({ queryClient, page });

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <ul className={styles.list}>
        {data?.postIds.map((id) => {
          const post = data?.posts[id];
          return <Post key={id} showExcerpt={true} post={post} />;
        })}
      </ul>
      <div className={styles.pag}>
        <button
          className={styles.btn}
          type="button"
          onClick={() => page > 1 && setPage((page) => page - 1)}
          aria-disabled={page === 1}
        >
          Indietro
        </button>
        <button className={styles.btn} type="button" onClick={() => setPage((page) => page + 1)}>
          Avanti
        </button>
      </div>
    </>
  );
}
