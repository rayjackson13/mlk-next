/* eslint-disable no-var */
import { PageProps } from 'gatsby';
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';

export type StreamingLink = {
  service: 'apple' | 'spotify' | 'youtube' | 'deezer' | 'soundcloud';
  url: string;
};

export type Album = {
  date: string;
  id: string;
  imageLarge: FileNode;
  imageSmall: FileNode;
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

export type LocalizedPageProps = PageProps<unknown, { locale: string }>;

export type Translations = { [id: string]: string };

declare global {
  var translations: Translations;
}
