export async function makeWpApiCall<T>(aCB: Promise<T>): Promise<T | null> {
  try {
    const items = await aCB;
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
}
