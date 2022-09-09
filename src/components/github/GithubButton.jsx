import React, {useMemo} from 'react';
import clsx from 'clsx';
import {Star, Fork} from './icons';

const GitHubButton = ({
  type = 'star', // star or fork
  href,
  className = '',
  children,
  githubStats,
}) => {
  const isStar = type === 'star';
  const link = isStar ? href : `${href}/fork`;

  const Icon = isStar ? Star : Fork;

  const formatNum = (num) => {
    return num >= 1000 ? `${Math.round(num / 100) / 10}k` : num;
  };

  const stats = useMemo(() => {
    const stars = githubStats.stars;
    const forks = githubStats.forks;

    return {
      star: formatNum(stars),
      fork: formatNum(forks),
    };
  }, [githubStats]);

  return (
    <div className={`githubBtn-wrapper ${className}`}>
      <a
        href={link}
        className="githubBtn-link"
        target="_blank"
        rel="noopener noreferrer">
        <span
          className={clsx('githubBtn-icon-wrapper', {
            'githubBtn-star-icon': isStar,
          })}>
          <Icon />
        </span>

        <span className="githubBtn-icon-text">{children}</span>

        <span className="githubBtn-stat">
          {isStar ? stats.star : stats.fork}
        </span>
      </a>
    </div>
  );
};

export default GitHubButton;
