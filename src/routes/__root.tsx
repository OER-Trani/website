import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import Header from '../components/layout/Header';

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
      <nav>
        <Link
          to="/"
          activeProps={{
            className: 'active',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        {/* <Link
          to={'/posts'}
          activeProps={{
            className: 'active',
          }}
        >
          Posts
        </Link> */}
      </nav>
      <hr />
      <Header />
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
