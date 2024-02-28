import {
  faApple,
  faDeezer,
  faSoundcloud,
  faSpotify,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type Variant = 'apple' | 'spotify' | 'youtube' | 'soundcloud' | 'deezer';
type ServicesType = {
  [x in Variant]: {
    backgroundColor: string;
    color: string;
    icon: IconDefinition;
    name: string;
  };
};

export const StreamingServices: ServicesType = {
  apple: {
    backgroundColor: '#fa415b',
    color: '#fff',
    icon: faApple,
    name: 'Apple Music',
  },
  spotify: {
    backgroundColor: '#171413',
    color: '#1dd861',
    icon: faSpotify,
    name: 'Spotify',
  },
  youtube: {
    backgroundColor: '#fff',
    color: '#f00',
    icon: faYoutube,
    name: 'YouTube Music',
  },
  soundcloud: {
    backgroundColor: '#f50',
    color: '#fff',
    icon: faSoundcloud,
    name: 'SoundCloud',
  },
  deezer: {
    backgroundColor: '#32333a',
    color: '#fff',
    icon: faDeezer,
    name: 'Deezer',
  },
};
