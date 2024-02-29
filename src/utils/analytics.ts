import axios from 'axios';
import Mixpanel, { Dict } from 'mixpanel-browser';

export const enum Events {
  PageVisited = 'Page Visited',
  SocialClicked = 'Social Link Clicked',
  StreamClicked = 'Stream Link Clicked',
}

export class Analytics {
  static init = (): void => {
    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

    if (!token) {
      console.warn('Could not initialize Mixpanel. Token is not found.');
      return;
    }

    Mixpanel.init(token);
    Mixpanel.set_config({ persistence: 'localStorage' });
  };

  static sendTrackRequest = async (
    name: Events,
    properties: Dict,
  ): Promise<void> => {
    try {
      axios.post('/api/usage', {
        data: {
          name,
          properties,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  static track = async (name: Events, properties: Dict): Promise<void> => {
    const request = await this.trackMixpanel(name, properties);
    this.sendTrackRequest(name, request.properties);
  };

  static trackMixpanel = async (
    name: string,
    properties: Dict,
  ): Promise<{ properties: Dict }> =>
    new Promise((resolve) => {
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-ignore;
      Mixpanel.track(name, properties, {}, (args, props) => resolve(props));
    });
}
