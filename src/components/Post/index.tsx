import { Link } from '@tanstack/react-router';
import { useMemo } from 'react';
import sanitizePostContent from '../../lib/sanitize-html';
import { PostType } from '../../lib/wp-rest-api/types/post';
import { getPostLink } from '../../utils/routes';
import styles from './styles.module.css';

interface PostProps {
  post: PostType | undefined;
  showExcerpt: boolean;
}

export default function Post({ post, showExcerpt = false }: PostProps) {
  const text = showExcerpt ? post?.excerpt?.rendered : post?.content?.rendered;
  const sanizedContent = useMemo(() => text && sanitizePostContent(text), [text]);

  if (!post || !sanizedContent) {
    return showExcerpt ? null : <i>Articolo non trovato</i>;
  }

  const date = new Intl.DateTimeFormat('it', {
    month: 'short',
    day: 'numeric',
    timeZone: 'Europe/Rome',
  }).format(new Date(post.modified_gmt));

  const link = getPostLink({ id: post.id, slug: post.slug });

  return (
    <li className={styles.item}>
      <article className={styles.post}>
        <Link href={link}>
          <h3>{post.title.rendered}</h3>
        </Link>
        <time dateTime={post.modified} className={styles.date}>
          {date}
        </time>
        <div dangerouslySetInnerHTML={{ __html: sanizedContent }} />
      </article>
    </li>
  );
}
