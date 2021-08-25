# cra-template-antd-admin

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

The antd+TS, tailwindcss, styled-components, react-router, react-query template for [Create React App](https://create-react-app.dev/)

一款使用 antd 拉好基本佈局、並整合好 [router](https://reactrouter.com/), [styled-components](https://styled-components.com/), [tailwindcss](https://tailwindcss.com/), [prettier commit hook](https://prettier.io/docs/en/precommit.html) 和 [craco](https://github.com/gsoft-inc/craco) 設定的 CRA 樣板，讓你跳過拉佈局、設定路由、 babel 和 webpack 的路徑別名等等步驟，可以快速開始一個以 antd 作為基礎功能和 UI 的專案

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/FalloutChonny/cra-template-antd-admin">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">cra-template-antd-admin</h3>

  <p align="center">
    An awesome cra template to jumpstart your projects!
    <br />
    <a href="https://github.com/FalloutChonny/cra-template-antd-admin"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/FalloutChonny/cra-template-antd-admin/issues">Report Bug</a>
    ·
    <a href="https://github.com/FalloutChonny/cra-template-antd-admin/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
	<a href="#folder-structure">Folder Structure</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>
 
<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/FallOutChonny/cra-template-antd-admin)

This is a [Create React App](https://create-react-app.dev/) template that integrates many tools and libs, it can let you start the development work directly and quickly without trivial steps to set up your project.

<!-- BUILT WITH -->

### Built with

- [ant design](https://github.com/ant-design/ant-design)

  - basic layouts (do not include any custom styles, you can easily adjust it to what you want.)
  - this template provides a page for basic CRUD actions sample.


- [craco](https://github.com/gsoft-inc/craco) for extend webpack config provided by create-react-app without eject

  - absolute import path with `@` prefix, such as:

    - @pages/Home
    - @hooks/useModal
    - @components/Layout

  - webpack-bundle-analyzer - generate a interactive zoomable treemap to reivew your bundle.

    - usage: `ANALYZE=true craco build`

  - babel-plugin-import - only boundle the styles and components of antd that used by the app.

  - babel-plugin-styled-components
    - purge unused styles
    - support css props in native html tag.

- [prettier](https://prettier.io/docs/en/precommit.html)

  - pre-commit hook with husky, lint-staged, this can re-format your files that are marked as “staged” via git add before you commit.

- [tailwindcss](https://tailwindcss.com/)

  - building layouts freely.
  - purge enabled.

- [styled-components](https://styled-components.com/)

  - building custom components.
  - overriding antd component styles.

- [react-router](https://reactrouter.com/)

  - The route setting has been written in lib/routes, which is provided to Sider, App or any other components.

- [react-query](https://react-query.tanstack.com/) - Fetch, cache and update data

<!-- GETTING STARTED -->

## Getting Started

To use this template, add --template antd-admin when creating a new app.

### Prerequisites

- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
npx create-react-app my-app --template antd-admin

# or

yarn create react-app my-app --template antd-admin
```

It will create a directory called my-app inside the current folder.

<!-- FOLDER STRUCTURE -->

## Folder Structure

Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── img
│   │   ├── 403.svg
│   │   ├── 404.svg
│   │   ├── 500.svg
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── components
    │   ├── common
    │   │   ├── Layout.tsx			- basic page layout
    │   │   ├── Loading.tsx			- loading indicator
    │   │   └── Modal.tsx			- global modal
    │   ├── icons			    	- custom/extend icons
    │   │   ├── Add.tsx
    │   │   └── Edit.tsx
    │   ├── ui                      - should be atomic and pure, like Button, Select, Tabs
    │   │   ├── Header.tsx			- the navbar of app
    │   │   └── Sider.tsx			- the left sider of app
    │   ├── ErrorBoundary.tsx 		- handling react errors
    │   └── Exception.tsx    		- feed back the 404/403/500 results
    ├── hooks
    │   ├── useModal.ts				- react hook for simplify the interaction with Modal
    │   └── useTableRowSelection.ts - react hook for simplify the interaction with Table
    ├── lib
    │   ├── queryClient.ts			- create a query client for react-query provider
    │   ├── routes.ts				- global route setting
    │   ├── types.ts				- types about data fetching
    │   └── useQuery.ts				- react-query's useQuery wrapper
    ├── pages
    │   ├── Home					- basic table list, CRUD example page
    ├── utils
    │   ├── env.ts					- app config such as `api url`, `app basename`
    │   ├── form.ts					- antd form helpers
    │   ├── history.ts				- global history
    │   ├── request.ts				- simple custom fetch wrapper
    │   └── webHelper.ts			- util functions
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    └── serviceWorker.js
    └── setupTests.js

```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/FallOutChonny/cra-template-antd-admin/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Chonny Chu - mama.whowho@gmail.com

Project Link - [https://github.com/FallOutChonny/cra-template-antd-admin](https://github.com/FallOutChonny/cra-template-antd-admin)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Ant-Design](https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge)
- [Create-React-App](https://github.com/othneildrew/Best-README-Template/graphs/contributors)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/FallOutChonny/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/FallOutChonny/cra-template-antd-admin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/FallOutChonny/repo.svg?style=for-the-badge
[forks-url]: https://github.com/FallOutChonny/cra-template-antd-admin/network/members
[stars-shield]: https://img.shields.io/github/stars/falloutchonny/repo.svg?style=for-the-badge
[stars-url]: https://github.com/FallOutChonny/cra-template-antd-admin/stargazers
[issues-shield]: https://img.shields.io/github/issues/falloutchonny/repo.svg?style=for-the-badge
[issues-url]: https://github.com/FallOutChonny/cra-template-antd-admin/issues
[license-shield]: https://img.shields.io/github/license/falloutchonny/repo.svg?style=for-the-badge
[license-url]: https://github.com/FallOutChonny/cra-template-antd-admin/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/FallOutChonny
[product-screenshot]: screenshots/screenshots1.png
