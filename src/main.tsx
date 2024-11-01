import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { queryClient } from './lib/react-query/constants';
import QueryProvider from './lib/react-query/QueryProviderComponent';
import { routeTree } from './routeTree.gen';
import { isGhPage } from './utils/routes';
//import './index.css';

const history = isGhPage() ? createHashHistory() : undefined;

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  history,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <RouterProvider router={router} />
  </QueryProvider>,
);
