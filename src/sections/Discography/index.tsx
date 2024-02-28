import React, { forwardRef } from 'react';

import { ReleaseList } from './List';

import { Album } from 'types';
import { getTranslation } from 'utils/helpers/getTranslation';

type Props = {
  albums: Album[];
};

export const Discography = forwardRef<HTMLElement, Props>(
  ({ albums }, ref): JSX.Element => {
    const title = getTranslation('discography');

    return (
      <section className="section" ref={ref}>
        <div className="container">
          <h2 className="section__title">{title}</h2>
          <ReleaseList albums={albums} />
        </div>
      </section>
    );
  },
);

Discography.displayName = 'Music';
