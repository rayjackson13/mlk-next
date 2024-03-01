import { GetServerSideProps } from 'next';

import { Locales } from 'constants/locales';
import { Album } from 'types';
import { loadAllReleases } from 'utils/helpers/loadAllReleases';

const getXLinks = (baseURL: string, path: string): string =>
  Locales.map(({ locale }) => {
    const href = `${baseURL}/${locale}${path}`;
    return `<xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`;
  }).join('');

const renderPathLinks = (baseURL: string, path: string): string =>
  Locales.map(
    ({ locale }) => `
      <url>
        <loc>${baseURL}/${locale}${path}</loc>
        ${getXLinks(baseURL, path)}
      </url>
    `,
  ).join('');

const getReleaseURLs = (release: Album, baseURL: string): string =>
  renderPathLinks(baseURL, `/release/${release.slug}/`);

const generateSiteMap = (
  baseURL: string,
  releases: Album[],
): string => `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
     ${renderPathLinks(baseURL, '/')}
     ${releases.map((item) => getReleaseURLs(item, baseURL)).join('')}
   </urlset>
 `;

function SiteMap(): null {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const { host } = req.headers;
  if (!host) {
    return {
      props: {},
    };
  }

  const protocol = host.startsWith('localhost') ? 'http://' : 'https://';
  const baseURL = protocol.concat(host);
  const releases = loadAllReleases();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(baseURL, releases);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
