import React from 'react';

const katacodaShellBlock = (props) => {
  const {children} = props;

  return (
    <div>
      <code className="language-shell" data-lang="shell">
        {children}
      </code>
    </div>
  );
};

export default katacodaShellBlock;
