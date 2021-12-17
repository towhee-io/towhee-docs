import React from 'react';


const katacodaShellBlock = props => {
  console.log('---- props', props)
  const {children} = props

  return (
    <div>
      <code className="language-shell" data-lang="shell">
        {children}
      </code>
    </div>
  )
};

export default katacodaShellBlock;
