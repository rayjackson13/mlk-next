import { Album, ReleasesQueryResult } from 'types';

export const getAlbumsFromQuery = ({
  nodes,
}: ReleasesQueryResult['allFile']): Album[] =>
  nodes.map(({ childMarkdownRemark }) => ({
    ...childMarkdownRemark.frontmatter,
    id: childMarkdownRemark.id,
  }));
