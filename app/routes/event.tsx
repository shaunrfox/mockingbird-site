import { EventDetailPage } from '../../src/components/EventDetail';
import { eventMeta } from '../../src/lib/event-format';
import { getEvent } from '../../src/lib/sanity';
import type { Route } from './+types/event';

export async function loader({ params }: Route.LoaderArgs) {
  const event = await getEvent(params.programSlug, params.dateSlug);
  if (!event) throw new Response('Not found', { status: 404 });
  return { event };
}

export function meta({ data }: Route.MetaArgs) {
  return eventMeta(data?.event);
}

export default function Event({ loaderData }: Route.ComponentProps) {
  return <EventDetailPage event={loaderData.event} />;
}
