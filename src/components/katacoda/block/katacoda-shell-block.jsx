import React from 'react';
import CodeBlock from '@theme/CodeBlock';

const KatacodaShellBlock = (props) => {
  const {children} = props;

  return <CodeBlock className="language-shell">{children}</CodeBlock>;
};

export default KatacodaShellBlock;
