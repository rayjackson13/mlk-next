/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Mixpanel from 'mixpanel';
import { NextRequest } from 'next/server';

const mixpanel = Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? '');

export async function POST(request: NextRequest) {
  const res = await request.json();
  const { name, properties } = res.data;

  mixpanel.track(`${name} API`, {
    ...properties,
    Country: request.geo?.country,
    City: request.geo?.city,
    Region: request.geo?.region,
  });

  return new Response(null, { status: 204 });
}
