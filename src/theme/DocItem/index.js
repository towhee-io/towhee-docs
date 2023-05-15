import React from 'react';
import clsx from 'clsx';
import useWindowSize from '@theme/hooks/useWindowSize';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import Seo from '@theme/Seo';
import DocItemFooter from '@theme/DocItemFooter';
import TOC from '@theme/TOC';
import TOCCollapsible from '@theme/TOCCollapsible';
import {MainHeading} from '@theme/Heading';
import styles from './styles.module.css';
import {ThemeClassNames} from '@docusaurus/theme-common';
import BlogPostAuthors from '@theme/BlogPostAuthors';

export default function DocItem(props) {
  const {content: DocContent} = props;
  const {metadata, frontMatter} = DocContent;
  const {
    image,
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
    authors,
  } = frontMatter;
  const {description, title} = metadata; // We only add a title if:
  // - user asks to hide it with frontmatter
  // - the markdown content does not already contain a top-level h1 heading

  // set assets for BlogPostAuthors component
  const assets = {authorsImageUrls: []};

  const shouldAddTitle =
    !hideTitle && typeof DocContent.contentTitle === 'undefined';
  const windowSize = useWindowSize();
  const canRenderTOC =
    !hideTableOfContents && DocContent.toc && DocContent.toc.length > 0;
  const renderTocDesktop =
    canRenderTOC && (windowSize === 'desktop' || windowSize === 'ssr');
  return (
    <>
      <Seo
        {...{
          title,
          description,
          keywords,
          image,
        }}
      />

      <div className="row">
        <div
          className={clsx('col', {
            [styles.docItemCol]: !hideTableOfContents,
          })}>
          <DocVersionBanner />
          <div className={styles.docItemContainer}>
            <article>
              <DocVersionBadge />

              {canRenderTOC && (
                <TOCCollapsible
                  toc={DocContent.toc}
                  minHeadingLevel={tocMinHeadingLevel}
                  maxHeadingLevel={tocMaxHeadingLevel}
                  className={clsx(
                    ThemeClassNames.docs.docTocMobile,
                    styles.tocMobile,
                  )}
                />
              )}

              <div
                className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
                {/*
                Title can be declared inside md content or declared through frontmatter and added manually
                To make both cases consistent, the added title is added under the same div.markdown block
                See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120
                */}
                {shouldAddTitle && <MainHeading>{title}</MainHeading>}

                {/* use authors component in blog template */}
                {authors && authors.length > 0 && (
                  <>
                    <h5>Authors:</h5>
                    <BlogPostAuthors authors={authors} assets={assets} />
                    {/* divider */}
                    <div className={styles.divider}></div>
                  </>
                )}
                <DocContent />
              </div>

              <DocItemFooter {...props} />
            </article>

            <DocPaginator previous={metadata.previous} next={metadata.next} />
          </div>
        </div>
        {renderTocDesktop && (
          <div className="col col--3">
            <TOC
              toc={DocContent.toc}
              minHeadingLevel={tocMinHeadingLevel}
              maxHeadingLevel={tocMaxHeadingLevel}
              className={ThemeClassNames.docs.docTocDesktop}
            />
          </div>
        )}
      </div>
    </>
  );
}
