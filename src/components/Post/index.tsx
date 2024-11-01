import { useMemo } from 'react';
import sanitizePostContent from '../../lib/sanitize-html';
import { PostType } from '../../lib/wpapi/types/post';
import styles from './styles.module.css';

interface PostProps {
  post: PostType | undefined;
  showExcerpt: boolean;
}

export default function Post({ post, showExcerpt = false }: PostProps) {
  const text = showExcerpt ? post?.excerpt.rendered : post?.content.rendered;
  const sanizedContent = useMemo(() => text && sanitizePostContent(text), [text]);

  if (!post || !sanizedContent) {
    return null;
  }

  const date = new Intl.DateTimeFormat('it', {
    month: 'short',
    day: 'numeric',
    timeZone: 'Europe/Rome',
  }).format(new Date(post.modified_gmt));

  return (
    <li className={styles.item}>
      <article className={styles.post}>
        <a href={''}>
          <h3>{post.title.rendered}</h3>
        </a>
        <time dateTime={post.modified} className={styles.date}>
          {date}
        </time>
        <div dangerouslySetInnerHTML={{ __html: sanizedContent }} />
      </article>
    </li>
  );
}
