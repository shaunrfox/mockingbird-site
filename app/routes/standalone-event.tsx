import { EventDetailPage } from '../../src/components/EventDetail';
import { eventMeta } from '../../src/lib/event-format';
import { getStandaloneEvent } from '../../src/lib/sanity';
import type { Route } from './+types/standalone-event';

export async function loader({ params }: Route.LoaderArgs) {
  const event = await getStandaloneEvent(params.slug);
  if (!event) throw new Response('Not found', { status: 404 });
  return { event };
}

export function meta({ data }: Route.MetaArgs) {
  return eventMeta(data?.event);
}

export default function StandaloneEvent({ loaderData }: Route.ComponentProps) {
  return <EventDetailPage event={loaderData.event} />;
}
