import type WPAPI from 'wpapi';
import type { PostType } from '../types/post';

export async function getPages(client: WPAPI) {
  try {
    const items = (await client.pages().perPage(10)) as PostType[];
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPage(client: WPAPI, id: number) {
  try {
    const items = await client.pages().id(id);
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}
