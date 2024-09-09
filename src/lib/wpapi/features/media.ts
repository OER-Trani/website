import type WPAPI from 'wpapi';

export async function getMedia(client: WPAPI, id: number) {
  try {
    const items = await client.media().id(id);
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}
