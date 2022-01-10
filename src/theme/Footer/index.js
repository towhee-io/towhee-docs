/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';
import IconExternalLink from '@theme/IconExternalLink';

import SlackIcon from '@site/static/img/icons/icon-slack.svg';
import TwitterIcon from '@site/static/img/icons/icon-twitter.svg';
import GithubIcon from '@site/static/img/icons/icon-github.svg';
import Rectangle from '@site/static/img/icons/rectangle.svg';

function FooterLink({to, href, label, prependBaseUrlToHref, ...props}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
          {/* <IconExternalLink /> */}
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

function FooterLogo({sources, alt, width, height}) {
  return (
    <ThemedImage
      className="footer__logo"
      alt={alt}
      sources={sources}
      width={width}
      height={height}
    />
  );
}

function MultiColumnLinks({links}) {
  return (
    <>
      {links.map((linkItem, i) => (
        <div key={i} className="col footer__col">
          <div className="footer__title">{linkItem.title}</div>
          <ul className="footer__items">
            {linkItem.items.map((item, key) =>
              item.html ? (
                <li
                  key={key}
                  className="footer__item" // Developer provided the HTML, so assume it's safe.
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: item.html,
                  }}
                />
              ) : (
                <li key={item.href || item.to} className="footer__item">
                  <FooterLink {...item} />
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </>
  );
}

function SimpleLinks({links}) {
  return (
    <div className="footer__links simple-links">
      {links.map((item, key) => (
        <span key={key}>
          {item.html ? (
            <span
              className="footer__link-item" // Developer provided the HTML, so assume it's safe.
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: item.html,
              }}
            />
          ) : (
            <FooterLink {...item} />
          )}
          {/* {links.length !== key + 1 && (
            <span className="footer__link-separator">·</span>
          )} */}
        </span>
      ))}
    </div>
  );
}

function isMultiColumnFooterLinks(links) {
  return 'title' in links[0];
}

function Footer() {
  const {footer} = useThemeConfig();
  const {copyright, links = [], logo = {}} = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': footer.style === 'dark',
      })}>
      <div className="footer__content-top">
        {logo && (logo.src || logo.srcDark) && (
          <div className="margin-bottom--sm">
            {logo.href ? (
              <Link href={logo.href} className={styles.footerLogoLink}>
                <FooterLogo
                  alt={logo.alt}
                  sources={sources}
                  width={logo.width}
                  height={logo.height}
                />
              </Link>
            ) : (
              <FooterLogo alt={logo.alt} sources={sources} />
            )}
          </div>
        )}

        <div className="container container-fluid navs-desktop">
          {links &&
            links.length > 0 &&
            (isMultiColumnFooterLinks(links) ? (
              <div className="row footer__links">
                <MultiColumnLinks links={links} />
              </div>
            ) : (
              <div className="footer__links text--center">
                <SimpleLinks links={links} />
              </div>
            ))}
        </div>

        <ul className="socials">
          <li>
            <a href="https://slack.towhee.io" target="_blank">
              <SlackIcon title="Slack logo" className="social-icon" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/towheeio" target="_blank">
              <TwitterIcon title="Twitter logo" className="social-icon" />
            </a>
          </li>
          <li>
            <a href="https://github.com/towhee-io/towhee" target="_blank">
              <GithubIcon title="Github logo" className="social-icon" />
            </a>
          </li>
        </ul>
      </div>

      <div className="footer__content-bottom">
        <div className="container container-fluid navs-mobile">
          {links &&
            links.length > 0 &&
            (isMultiColumnFooterLinks(links) ? (
              <div className="row footer__links">
                <MultiColumnLinks links={links} />
              </div>
            ) : (
              <div className="footer__links text--center">
                <SimpleLinks links={links} />
              </div>
            ))}
        </div>
        <div className="copyright-section">
          <Rectangle className="rectangle" />
          <Rectangle className="rectangle rectangle-2" />
          {copyright && (
            <div className="footer__bottom text--center">
              {copyright ? (
                <div
                  className="footer__copyright" // Developer provided the HTML, so assume it's safe.
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: copyright,
                  }}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
