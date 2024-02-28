import { graphql, useStaticQuery } from 'gatsby';

import { useLocale } from './useLocale';

import { Translations } from 'types';

type QueryResult = {
  allFile: {
    nodes: {
      childMarkdownRemark: {
        frontmatter: Translations;
      };
      name: string;
    }[];
  };
};

const query = graphql`
  {
    allFile(filter: { sourceInstanceName: { eq: "locales" } }) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            discography
            newRelease
            outNow
            rights
            single
            title
            pageDescription
            releasePageDesc
            notFoundTitle
            notFoundDesc
          }
        }
        name
      }
    }
  }
`;

const retrieveTranslations = (
  locale: string,
  { nodes }: QueryResult['allFile'],
): Translations => {
  const { childMarkdownRemark } =
    nodes.find(({ name }) => name === locale) ?? nodes[0];

  return childMarkdownRemark.frontmatter;
};

export const useTranslationLoader = (): void => {
  const locale = useLocale();
  const { allFile } = useStaticQuery<QueryResult>(query);
  const translations = retrieveTranslations(locale, allFile);
  global.translations = translations;
};
