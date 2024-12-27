function getBasePath() {
  return '';
}

export function getPageLink({ id, slug }: { id: number; slug: string }) {
  return `${getBasePath()}/pages/${id}/${slug}`;
}

export function getPostLink({ id, slug }: { id: number; slug: string }) {
  return `${getBasePath()}/posts/${id}/${slug}`;
}

export function getHomeLink() {
  return `${getBasePath()}/`;
}

export function isInSubDomain() {
  return location.host.includes('github.io');
}
