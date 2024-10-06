import { useMemo } from 'react';
import { useGetPosts } from '../../hooks/posts';
import { queryClient } from '../../lib/react-query/constants';
import sanitizePostContent from '../../lib/sanitize-html';

interface PostProps {
  id: number;
  page: number;
  showExcerpt?: boolean;
}

export default function Post({ id, page, showExcerpt = false }: PostProps) {
  const { data } = useGetPosts({ queryClient, page });
  const post = data?.posts[id];
  const text = showExcerpt ? post?.excerpt.rendered : post?.content.rendered;
  const sanizedContent = useMemo(() => text && sanitizePostContent(text), [text]);

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
