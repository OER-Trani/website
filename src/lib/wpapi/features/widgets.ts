import type WPAPI from 'wpapi';
import wpClient from '../client';

wpClient.widgets = wpClient.registerRoute('wp/v2', '/widgets', {
  params: ['before', 'after', 'post', 'status', 'per_page'],
});

export const wpWidgets = wpClient.widgets() as WPAPI.WPRequest;
