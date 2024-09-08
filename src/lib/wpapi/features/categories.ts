import type WPAPI from 'wpapi';

export async function getCategories(client: WPAPI) {
  try {
    const items = await client.categories();
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}
