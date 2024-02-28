import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faApple,
  faSpotify,
  faYoutube,
  faSoundcloud,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

type IconMap = { [_: string]: IconDefinition };

const iconMap: IconMap = {
  apple: faApple,
  spotify: faSpotify,
  youtube: faYoutube,
  soundcloud: faSoundcloud,
  instagram: faInstagram,
};

export const getIcon = (name: string): IconDefinition =>
  iconMap[name] ?? faQuestionCircle;
