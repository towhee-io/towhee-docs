const fs = require('fs');

const setup = () => {
  // copy sidebar file
  fs.copyFileSync('towhee/docs/sidebars.js', './sidebars.js');
};

setup();
