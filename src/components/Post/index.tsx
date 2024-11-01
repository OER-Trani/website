import { useMemo } from 'react';
import sanitizePostContent from '../../lib/sanitize-html';
import { PostType } from '../../lib/wpapi/types/post';
import homeStyles from '../pages/Home/styles.module.css';
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

  return (
    <li className={`${homeStyles.item} ${showExcerpt ? styles.excerpt : ''} `}>
      <article className={styles.post}>
        <h3>{post.title.rendered}</h3>
        <div dangerouslySetInnerHTML={{ __html: sanizedContent }} />
      </article>
    </li>
  );
}
