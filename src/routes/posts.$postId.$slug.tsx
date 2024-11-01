import { createFileRoute } from '@tanstack/react-router';
import PostPage from '../components/pages/Post';

export const Route = createFileRoute('/posts/$postId/$slug')({
  component: PostPage,
});
