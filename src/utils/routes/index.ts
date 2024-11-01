const GITHUB_PAGES_PATH = '/website/#';

function getBasePath() {
  if (isGhPage()) return GITHUB_PAGES_PATH;
  return '';
}

export function getPostLink({ id, slug }: { id: number; slug: string }) {
  return `${getBasePath()}/posts/${id}/${slug}`;
}

export function getHomeLink() {
  return `${getBasePath()}/`;
}

export function isGhPage() {
  return location.host.includes('github.io');
}
