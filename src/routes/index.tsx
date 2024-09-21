import { createFileRoute } from '@tanstack/react-router';
import StickyPosts from '../components/StickyPosts';
import Posts from '../components/Posts';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <StickyPosts />
      <Posts />
    </>
  );
}
