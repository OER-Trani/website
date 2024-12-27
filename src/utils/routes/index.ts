export function getPageLink({ id, slug }: { id: number; slug: string }) {
  return `/pages/${id}/${slug}`;
}

export function getPostsLink() {
  return `/posts`;
}

export function getPostLink({ id, slug }: { id: number; slug: string }) {
  return `/posts/${id}/${slug}`;
}

export function getHomeLink() {
  return `/`;
}

export function isInSubDomain() {
  return location.host.includes('github.io');
}
