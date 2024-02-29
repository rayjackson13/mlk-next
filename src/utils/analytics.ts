// import * as Vercel from '@vercel/analytics/react';
// import Mixpanel, { Dict } from 'mixpanel-browser';

// export const enum Events {
//   PageVisited = 'Page Visited',
//   SocialClicked = 'Social Link Clicked',
//   StreamClicked = 'Stream Link Clicked',
// }

// export class Analytics {
//   static init = (): void => {
//     const token = process.env.GATSBY_MIXPANEL_TOKEN;

//     if (!token) {
//       console.warn(
//         // eslint-disable-next-line quotes
//         "Mixpanel token wasn't set. Please check your env variables.",
//       );
//       return;
//     }

//     Mixpanel.init(token, {
//       // debug: true,
//       track_pageview: true,
//       persistence: 'localStorage',
//     });
//   };

//   static track = (name: Events, properties: Dict | undefined): void => {
//     Mixpanel.track(name, properties);
//     Vercel.track(name, properties);
//   };
// }
