import Home from '../../src/pages/Home';
import { getHomeContent } from '../../src/lib/sanity';
import type { Route } from './+types/home';

export async function loader() {
  const today = new Date().toISOString().slice(0, 10);
  return await getHomeContent(today);
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  return <Home featured={loaderData.featured} upcoming={loaderData.upcoming} />;
}
