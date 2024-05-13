import {
  faApple,
  faDeezer,
  faSoundcloud,
  faSpotify,
  faYoutube,
  faVk,
} from '@fortawesome/free-brands-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

import YaMusicIcon from 'assets/svg/yandex.svg';
import { FAIcon } from 'components/FAIcon';
import { StreamServiceVariant } from 'types';

type Props = {
  service: StreamServiceVariant;
};

const IconMap: { [x in StreamServiceVariant | 'default']: JSX.Element } = {
  apple: <FAIcon name={faApple} />,
  spotify: <FAIcon name={faSpotify} />,
  youtube: <FAIcon name={faYoutube} />,
  deezer: <FAIcon name={faDeezer} />,
  soundcloud: <FAIcon name={faSoundcloud} />,
  yandex: <YaMusicIcon className="svg-inline--fa fa-fw" />,
  vkmusic: <FAIcon name={faVk} />,
  default: <FAIcon name={faQuestion} />,
};

export const StreamIcon = ({ service }: Props): JSX.Element =>
  IconMap[service] ?? IconMap.default;
