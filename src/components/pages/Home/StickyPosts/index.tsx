import { useGetStickyPosts } from '../../../../hooks/posts';
import { queryClient } from '../../../../lib/react-query/constants';
import Post from '../../../Post';
import homeStyles from '../styles.module.css';

export default function StickyPosts() {
  const { data } = useGetStickyPosts({ queryClient });
  return (
    <>
      <h2>In evidenza</h2>
      <ul className={homeStyles.list}>
        {data?.postIds.map((id) => <PostContainer id={id} key={id} showExcerpt={true} />)}
      </ul>
    </>
  );
}

interface PostProps {
  id: number;
  showExcerpt: boolean;
}

function PostContainer({ id }: PostProps) {
  const { data } = useGetStickyPosts({ queryClient });
  const post = data?.posts[id];

  return <Post showExcerpt={true} post={post} />;
}
