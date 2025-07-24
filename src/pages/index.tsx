import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ProductCards from '@site/src/components/ProductCards';
import DocLinks from '@site/src/components/DocLinks';
import Sdks from '@site/src/components/Sdks';
import CommunityChannel from '@site/src/components/CommunityChannel';
import { translations } from '../translations';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './index.module.css';

function HomepageHeader() {
  const { i18n } = useDocusaurusContext();
  const { isDarkTheme } = useColorMode();

  const { title, subtitle, getStarted } = translations[i18n.currentLocale].hero || translations['en'].hero;
  return (
    <div className={styles.container}>
      <div className="container">
        <img
          src={isDarkTheme ? '/img/logotipo-white.png' : '/img/logotipo-purple.png'}
          className={styles.heroLogo}
          alt="Guardia Logo"
        />
        <Heading as="h1" className="hero__title">
          {title}
        </Heading>
        <p className="hero__subtitle">
          {subtitle}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            {getStarted}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig, i18n } = useDocusaurusContext();
  return (
    <>
      <Layout
        title={`${siteConfig.tagline}`}>
        <div className={styles.background}>
          <HomepageHeader />
          <ProductCards />
          <DocLinks />
          <Sdks />
          <CommunityChannel />
        </div >
      </Layout>
    </>
  );
}
