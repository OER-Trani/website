import { createFileRoute } from '@tanstack/react-router';
import PostsPage from '../components/pages/Posts';

export const Route = createFileRoute('/posts/')({
  component: PostsPage,
});
