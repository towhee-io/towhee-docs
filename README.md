# Towhee docs and its website

This repo contains the website configuration and documentation powering the Towhee docs website.

## 🚀 Getting started

### Prerequisites

1.  [Node](https://nodejs.org/en/download/) _(needed for preview)_.
2.  [Yarn](https://yarnpkg.com/lang/en/docs/install/) _(needed for preview)_.

### Installation

1.  `cd towhee-docs` to go into the project root.
1.  `yarn` to install the website's workspace dependencies.

### Running locally
1.  `yarn start` to start the development server _(powered by [Docusaurus](https://v2.docusaurus.io))_.
2.  `open http://localhost:3000/docs/quick_start` to open the site in your favorite browser.


## 👏 Contributing

### Update docs
* All our documentation is generated from markdown files you can find in the `docs` directory. If the program is already running locally, everytime you change the file, you can visit `http://localhost:3000/docs/YOUR-DOCS-PAGE` to see your work.

* If you want to add a new doc or update order or label the docs appear in the sidebar, you can change header metadata (aka frontmatter) in the markdown or take a look at the `sidebars.json` file. 

* In most cases, you needn't use custom components in markdown, but you do, change the file extension from `md` to `mdx` so you can write JSX in markdown files and render them as React components easily. For more, please refer to https://docusaurus.io/docs/markdown-features/react.
### Update website
Our doc website is a static site generated using [Docusaurus](https://docusaurus.io/). Please make sure you have been familiar with it before contributing. 