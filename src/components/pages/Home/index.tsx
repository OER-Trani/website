import Posts from './Posts';
import StickyPosts from './StickyPosts';

export default function Home() {
  return (
    <>
      <StickyPosts />
      <Posts />
    </>
  );
}
