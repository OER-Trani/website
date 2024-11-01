export function getPostLink({ id, slug }: { id: number; slug: string }) {
  return `/posts/${id}/${slug}`;
}
