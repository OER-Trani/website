import type WPAPI from 'wpapi';
import { MediaType } from '../types/media';

export async function getMedia(client: WPAPI, id: number) {
  try {
    const items: MediaType = await client.media().id(id);
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}
