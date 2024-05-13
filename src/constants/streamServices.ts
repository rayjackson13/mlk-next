import { StreamServiceVariant } from 'types';

type ServicesType = {
  [x in StreamServiceVariant]: {
    backgroundColor: string;
    color: string;
    name: string;
  };
};

export const StreamingServices: ServicesType = {
  apple: {
    backgroundColor: '#fa415b',
    color: '#fff',
    name: 'Apple Music',
  },
  spotify: {
    backgroundColor: '#171413',
    color: '#1dd861',
    name: 'Spotify',
  },
  youtube: {
    backgroundColor: '#fff',
    color: '#f00',
    name: 'YouTube Music',
  },
  soundcloud: {
    backgroundColor: '#f50',
    color: '#fff',
    name: 'SoundCloud',
  },
  deezer: {
    backgroundColor: '#32333a',
    color: '#fff',
    name: 'Deezer',
  },
  yandex: {
    backgroundColor: '#000000',
    color: '#FFBC0D',
    name: 'Яндекс Музыка',
  },
  vkmusic: {
    backgroundColor: '#000',
    color: '#fff',
    name: 'VK Музыка',
  },
};
