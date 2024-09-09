import type WPAPI from 'wpapi';

export async function getPosts(client: WPAPI) {
  try {
    const items = await client.posts();
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPost(client: WPAPI, id: number) {
  try {
    const items = await client.posts().id(id);
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}
