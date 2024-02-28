import { graphql } from 'gatsby';

export const ReleaseFragment = graphql`
  fragment ReleaseInfo on FileConnection {
    nodes {
      childMarkdownRemark {
        frontmatter {
          title
          date
          slug
          type
          imageSmall: art {
            childImageSharp {
              gatsbyImageData(
                width: 240
                sizes: "(max-width: 425px) 180px, 320px"
                breakpoints: [180, 320]
              )
            }
          }
          imageLarge: art {
            childImageSharp {
              gatsbyImageData(
                width: 880
                sizes: "(max-width: 767px) 220px, (max-width: 1399px) 440px, 880px"
                breakpoints: [220, 440, 880]
              )
            }
          }
          links {
            service
            url
          }
        }
        id
      }
    }
  }
`;
