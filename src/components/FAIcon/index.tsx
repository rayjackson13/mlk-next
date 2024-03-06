import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type IconProps = {
  name: IconDefinition;
};

export const FAIcon = ({ name }: IconProps): JSX.Element => (
  <FontAwesomeIcon fixedWidth icon={name} />
);
