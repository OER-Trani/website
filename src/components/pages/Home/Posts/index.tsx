import homeStyles from '../styles.module.css';
import PostsContainer from '../../../container/PostsContainer';

export default function Posts() {
  return (
    <section className={homeStyles.posts}>
      <h2>Ultimi articoli</h2>
      <PostsContainer />
    </section>
  );
}
