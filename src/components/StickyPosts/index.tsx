import { useMemo } from 'react';
import { useGetStickyPosts } from '../../hooks/posts';
import { queryClient } from '../../lib/react-query/constants';
import sanitizePostContent from '../../lib/sanitize-html';
import styles from '../Post/styles.module.css';

export default function StickyPosts() {
  const { data } = useGetStickyPosts({ queryClient });
  return <ul>{data?.postIds.map((id) => <Post id={id} key={id} />)}</ul>;
}

interface PostProps {
  id: number;
}

function Post({ id }: PostProps) {
  const { data } = useGetStickyPosts({ queryClient });
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
      <article className={styles.post}>
        <h2>{post.title.rendered}</h2>
        <div dangerouslySetInnerHTML={{ __html: sanizedContent }} />
      </article>
    </li>
  );
}
