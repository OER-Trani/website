import { ENDPOINT } from './constants';

export async function fetchWpRestApi<R>({
  endpoint = ENDPOINT,
  params,
  path,
}: {
  path: string;
  params: URLSearchParams;
  endpoint?: string;
}) {
  try {
    const response = await fetch(`${endpoint}${path}?${params}`);
    const json = await response.json();
    return json as R;
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function convertObjectInSearchParams(obj: Record<string, unknown>) {
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      value = +value;
    }
    params.append(key, String(value));
  });
  return params;
}
