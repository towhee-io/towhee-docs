# Towhee docs and its website

This repo contains the website configuration powering the Towhee docs website.

## 🚀 Getting started

### Prerequisites

1.  [Node](https://nodejs.org/en/download/) _(needed for preview)_.
2.  [Yarn](https://yarnpkg.com/lang/en/docs/install/) _(needed for preview)_.

### Installation

1.  `cd towhee-docs` to go into the project root.
1.  `yarn` to install the website's workspace dependencies.

### Running locally

1.  `yarn start` to fetch doc content from submodule and start the development server _(powered by [Docusaurus](https://v2.docusaurus.io))_.
2.  `open http://localhost:3000/` to open the site in your favorite browser.

## 👏 Contributing

### Update docs

- All our documentation is generated from markdown files you can find in the [`towhee-io/towhee`](https://github.com/towhee-io/towhee) repository's `docs` directory.

- Add a new doc

  1. Create a new markdown file and put it under `towhee-io/towhee` repository's `docs` directory
  2. At the top of file, specify `id` and `title` in the front matter. `title` will be default sidebar label, you can set `sidebar_label` to overwrite it.
  3. If you want to add authors in the doc, you can set `authors` object in the front matter as following example

  ```
  ---
    id: first-pipeline
    title: Running your first pipeline
    sidebar_label: Hello pipeline
    authors:
        - name: Joel Marcey
          # show as description (optional)
          title: Co-creator of Docusaurus 1
          url: https://github.com/JoelMarcey
          # show on the left (optional)
          imageURL: https://github.com/JoelMarcey.png
        - name: Sébastien Lorber
          url: https://sebastienlorber.com
          imageURL: https://github.com/slorber.png
  ---
  ```

- Update sidebar

  1. Take a look at the `sidebar.js` file in `docs`
  2. In `sidebars` object, `doc` represents menus on the left which is listed in order, you can switch item's position to change order.
  3. If you want to add a new nested menu, just push a new key-value pair to `doc` list. If you just want to add a new link, you only need to insert that markdown's `id` to the list.

  _Attention: If your markdown isn't placed in the root directory, you should add the name of the folder it is in before id, like 'folder-name/markdown-id'._

  ```javascript
  docs: [
    // add new nested menu in sidebar example
    {
      'parent-menu-label': [
        'parent-folder/child-content-id-1',
        'parent-folder/child-content-id-2',
      ],
    },
    // add new link in sidebar example
    'quick-start',
  ];
  ```

- In most cases, you needn't use custom components in markdown, but if you do, change the file extension from `md` to `mdx` so you can write JSX in markdown files and render them as React components easily. For more, please refer to https://docusaurus.io/docs/markdown-features/react.

- If you want to use code block, please specify language, otherwise the code highlighting will not take effect.

````
  ```javascript
    doc: [{
      key: value
    }]
  ```
````

### Update website

Our doc website is a static site generated using [Docusaurus](https://docusaurus.io/). Please make sure you have been familiar with it before contributing.
