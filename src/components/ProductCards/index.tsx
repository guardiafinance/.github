import React, { ReactNode } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translations } from '../../translations';
import { EXTERNAL_LINKS } from '@site/src/components/ExternalLink/external-links';

interface ProductCardProps {
  title: string | ReactNode;
  description: string;
  status: string;
  version: string;
  links: {
    github?: string;
    api?: string;
    docker?: string;
    docs?: string;
  };
}

function ProductCard({ title, description, status, version, links }: ProductCardProps) {
  const { i18n } = useDocusaurusContext();

  const { products } = translations[i18n.currentLocale];
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={clsx(styles.status, {
          [styles.statusDevelopment]: status === products.status.development
        })}>
          {status}
        </span>
        <span className={styles.version}>{version}</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.links}>
        {links.github && (
          <a href={links.github} className={styles.link} target='_blank'>
            <i className="fa-brands fa-github"></i>
            GitHub
          </a>
        )}
        {links.api && (
          <a href={links.api} className={styles.link} target='_blank'>
            <i className="fa-solid fa-code"></i>
            API
          </a>
        )}
        {links.docker && (
          <a href={links.docker} className={styles.link} target='_blank'>
            <i className="fa-brands fa-docker"></i>
            Docker Hub
          </a>
        )}
        {links.docs && (
          <a href={links.docs} className={styles.link} target='_blank'>
            <i className="fa-solid fa-book"></i>
            {products.documentation}
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProductCards() {
  const { i18n } = useDocusaurusContext();

  const { products } = translations[i18n.currentLocale] || translations['en'];
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <ProductCard
          title={<><i className="fas fa-layer-group"></i> Arkee</>}
          description={products.arkee.description}
          status={products.status.development}
          version="v0.1.0-alpha"
          links={{
            github: EXTERNAL_LINKS.GITHUB,
            api: '/docs/reference/arkee',
            docker: EXTERNAL_LINKS.DOCKER_HUB,
            docs: "/docs/modules/arkee/",
          }}
        />
      </div>
    </div>
  );
}