/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useEffect, useState} from 'react';
import {Octokit} from '@octokit/core';
import clsx from 'clsx';
import LastUpdated from '@theme/LastUpdated';
import EditThisPage from '@theme/EditThisPage';
import TagsListInline from '@theme/TagsListInline';
import styles from './styles.module.css';
import {ThemeClassNames} from '@docusaurus/theme-common';

// github access token for getting commit history for doc pages
const GET_COMMIT_TOKEN =
  'Z2hwX2o1UVN3MzR4UTZqWTM4ZjZkRmtCUHR1Q0hoZ3U2cjN5RHduTQ==';

/**
 * function to get filter path for github commit api
 * @param {string} source e.g. @site/docs/get-started/install.md
 * @returns e.g. docs/get-started/install.md
 */
const getPathFromSource = (source) => {
  return source.split('/').slice(1).join('/');
};

const getUniqueObjArray = (list, compareKey) => {
  const map = new Map();
  let uniqueList = [];
  list.forEach((item) => {
    const isExist = map.has(item[compareKey]);
    if (!isExist) {
      map.set(item[compareKey], true);
      uniqueList = [...uniqueList, item];
    }
  });

  return uniqueList;
};

function TagsRow(props) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        'row margin-bottom--sm',
      )}>
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}

function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>

      <div className={clsx('col', styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            formattedLastUpdatedAt={formattedLastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  );
}

const ContributorList = ({source}) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    // fetch github commit info for this page
    const fetchGithubCommits = async (source) => {
      const path = getPathFromSource(source);
      const auth = atob(GET_COMMIT_TOKEN);
      const octokit = new Octokit({auth});

      const {data} = await octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner: 'towhee-io',
          repo: 'towhee',
          path,
        },
      );

      const authors = data.map(({author}) => ({
        avatarUrl: author.avatar_url,
        url: author.html_url,
        username: author.login,
      }));

      // one contributor can submit multiple commits, so deduplication is required
      const list = getUniqueObjArray(authors, 'username');
      setContributors(list);
    };

    fetchGithubCommits(source);
  }, [source]);

  return (
    <>
      {contributors.length > 0 && (
        <section className="contributor-wrapper">
          <h5>
            {contributors.length > 1
              ? `${contributors.length} contributors for this page`
              : `1 contributor for this page`}
          </h5>
          <div className="contributor-list-wrapper">
            {contributors.map((contributor) => {
              return (
                <a
                  key={contributor.username}
                  href={contributor.url}
                  className="contributor-item"
                  target="_blank">
                  <img src={contributor.avatarUrl} alt={contributor.username} />
                </a>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default function DocItemFooter(props) {
  const {content: DocContent} = props;
  const {metadata} = DocContent;
  const {
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy,
    tags,
    source,
  } = metadata;

  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  if (!canDisplayFooter) {
    return null;
  }

  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
        />
      )}
      {/* list this page doc content all contributors */}
      <ContributorList source={source} />
    </footer>
  );
}
