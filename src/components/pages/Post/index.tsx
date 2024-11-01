import { useGetPost } from '../../../hooks/posts';
import { queryClient } from '../../../lib/react-query/constants';
import { Route } from '../../../routes/posts.$postId.$slug';
import Post from '../../Post';

export default function PostPage() {
  const id = +Route.useParams().postId;
  const post = useGetPost({ id, queryClient });
  if (!post) return null;
  return <Post post={post} showExcerpt={false} />;
}
