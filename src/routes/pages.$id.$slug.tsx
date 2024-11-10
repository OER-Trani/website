import { createFileRoute } from '@tanstack/react-router';
import PageDetail from '../components/pages/Page';

export const Route = createFileRoute('/pages/$id/$slug')({
  component: PageDetail,
});
