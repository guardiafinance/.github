import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { EXTERNAL_LINKS } from './src/components/ExternalLink/external-links';
import { getLocaleConfigs } from './src/translations/locales';

const config: Config = {
  title: 'Guardia',
  tagline: 'Developer Hub',
  favicon: 'img/favicon.ico',
  url: 'https://hub.guardia.finance',
  baseUrl: '/',
  organizationName: 'guardiafinance',
  projectName: 'hub',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en', 'es'],
    localeConfigs: getLocaleConfigs(),
  },

  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
    'docusaurus-theme-openapi-docs'
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          docItemComponent: "@theme/ApiItem",
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/oas.css"),
          ]
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        gtag: {
          trackingID: process.env.GA_TRACKING_ID || 'development',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    description: 'Documentação técnica, guias e recursos para a comunidade de desenvolvedores da Guardia',
    metadata: [
      {name: 'description', content: 'Documentação técnica, guias e recursos para a comunidade de desenvolvedores da Guardia'},
      {name: 'keywords', content: 'guardia, core banking, api docs, sdk, developer hub, documentation, core bancario open source'},
      {name: 'author', content: 'Guardia'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
      {name: 'theme-color', content: '#37104c'},
      {name: 'robots', content: 'index, follow'},
    ],
    image: 'img/docusaurus-social-card.jpg',
    customCss: [
      require.resolve("./src/css/custom.css"),
    ],
    navbar: {
      logo: {
        alt: 'Logotipo da Guardia',
        src: 'img/logotipo-purple.png',
        srcDark: 'img/logotipo-white.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          type: 'docSidebar',
          sidebarId: 'communitySidebar',
          position: 'left',
          label: 'Community',
        },
        {
          type: 'docSidebar',
          sidebarId: 'specificationsSidebar',
          position: 'left',
          label: 'Especificações',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialsSidebar',
          position: 'left',
          label: 'Tutorials',
        },
        {
          href: EXTERNAL_LINKS.PRODUCT_ROADMAP,
          position: 'right',
          label: 'Product Roadmap',
        },
        {
          href: EXTERNAL_LINKS.OPEN_ROADMAP,
          position: 'right',
          label: 'Issues Backlog',
        },
        {
          href: EXTERNAL_LINKS.GITHUB,
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right'
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
    colorMode: {
      disableSwitch: false,
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    baseUrlCanonical: 'https://hub.guardia.finance',
    createCanonicalUrlForDoc: true,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: 'https://hub.guardia.finance',
      siteName: 'Guardia Developer Hub',
      title: 'Developer Hub',
      description: 'Documentação técnica, guias e recursos para a comunidade de desenvolvedores da Guardia',
      images: [
        {
          url: 'img/logotipo-purple.png',
          width: 1200,
          height: 630,
          alt: 'Guardia Logotipo',
          type: 'image/png',
        },
      ],
      site_name: 'Guardia Developer Hub',
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@guardiafinance',
      creator: '@guardiafinance',
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        httpEquiv: 'Content-Security-Policy',
        content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.guardia.finance"
      }
    },
    {
      tagName: 'meta',
      attributes: {
        httpEquiv: 'X-Content-Type-Options',
        content: 'nosniff'
      }
    },
    {
      tagName: 'meta',
      attributes: {
        httpEquiv: 'X-Frame-Options',
        content: 'DENY'
      }
    },
    {
      tagName: 'meta',
      attributes: {
        httpEquiv: 'Strict-Transport-Security',
        content: 'max-age=31536000; includeSubDomains'
      }
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Guardia',
        description: 'Documentação técnica, guias e recursos para a comunidade de desenvolvedores da Guardia',
        url: 'https://hub.guardia.finance',
        publisher: {
          '@type': 'Organization',
          name: 'Guardia',
          logo: {
            '@type': 'ImageObject',
            url: 'https://hub.guardia.finance/img/logotipo-purple.png'
          }
        }
      }),
    }
  ],
  titleDelimiter: '|',
  noIndex: false,
  trailingSlash: true,

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's dimension, if exceeded, will resize by 0.8
        min: 640, // min resized image's dimension, if exceeded, will resize by 1.2
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          lke: {
            specPath: "oas/lke/lke.openapi.yaml",
            outputDir: "docs/api/lke",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
              sidebarCollapsible: true,
              sidebarCollapsed: true,
            },
            template: "templates/api.mustache",
            infoTemplate: "templates/info.mustache",
            tagTemplate: "templates/tag.mustache",
            schemaTemplate: "templates/schema.mustache",
            version: "1.0.0",
            label: "v1.0.0.",
            downloadUrl:
            "https://raw.githubusercontent.com/guardiafinance/hub/refs/heads/main/docs/api/lke/lke.openapi.yaml",
            showSchemas: true,
            hideSendButton: false,
            showExtensions: false,
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
  ],

  scripts: [
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`,
      async: true,
    },
  ]
};

export default config;
