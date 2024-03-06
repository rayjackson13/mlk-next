/* eslint-disable no-var */

type StreamServiceVariant =
  | 'apple'
  | 'spotify'
  | 'youtube'
  | 'soundcloud'
  | 'deezer'
  | 'yandex';

export type StreamingLink = {
  service: StreamServiceVariant;
  url: string;
};

export type Album = {
  art: string;
  date: string;
  hidden: boolean;
  id: string;
  links: StreamingLink[];
  slug: string;
  title: string;
  type: 'single' | 'album' | 'mixtape' | 'ep';
};

export type ReleasesQueryResult = {
  allFile: {
    nodes: {
      childMarkdownRemark: {
        frontmatter: Album;
        id: string;
      };
    }[];
  };
};

export type Translations = { [id: string]: string };

declare global {
  var translations: Translations;
}
