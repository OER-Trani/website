import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import Layout from '../components/layout';

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    );

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <h2>Not found</h2>
        <p>
          <Link to="/">Go back to the home page</Link>
        </p>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <ReactQueryDevtools buttonPosition="top-right" />
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </>
  );
}
