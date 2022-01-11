const fs = require('fs-extra');

const setup = () => {
  // copy sidebar file
  fs.copyFileSync('towhee/docs/sidebars.js', './sidebars.js');
  // copy docs folder
  fs.copy('towhee/docs', './docs');
};

setup();
