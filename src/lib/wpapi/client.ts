// @see https://www.npmjs.com/package/wpapi#setter-method-naming-for-named-route-components
import WPAPI from 'wpapi';

const wpClient = new WPAPI({
  endpoint: import.meta.env.VITE_CMS_API_ENDPOINT,
});

export default wpClient;
