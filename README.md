# AstraLumen

<p align="center">
    <!-- Project Stats -->
    <img src="https://img.shields.io/github/languages/top/idugeni/astralumen" alt="GitHub top language">
    <img src="https://img.shields.io/github/languages/count/idugeni/astralumen" alt="GitHub language count">
    <img src="https://img.shields.io/github/forks/idugeni/astralumen?style=social" alt="GitHub forks">
    <img src="https://img.shields.io/github/stars/idugeni/astralumen?style=social" alt="GitHub stars">
    <img src="https://img.shields.io/github/watchers/idugeni/astralumen?style=social" alt="GitHub watchers">
</p>

<p align="center">
    <!-- Issues & PRs -->
    <img src="https://img.shields.io/github/issues/idugeni/astralumen" alt="GitHub issues">
    <img src="https://img.shields.io/github/issues-pr/idugeni/astralumen" alt="GitHub pull requests">
    <img src="https://img.shields.io/github/contributors/idugeni/astralumen" alt="GitHub contributors">
    <img src="https://img.shields.io/github/last-commit/idugeni/astralumen" alt="GitHub last commit">
</p>

<p align="center">
    <!-- Technology & License -->
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
    <img src="https://img.shields.io/badge/Next.js-15-blue" alt="Next.js">
    <img src="https://img.shields.io/badge/TailwindCSS-v4-blue" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/ShadCN_UI-v3-blue" alt="ShadCN UI">
</p>

AstraLumen is a futuristic **Next.js 15** theme that combines cutting-edge design with the elegance of **Tailwind CSS** and **Shadcn UI** to create stunning, responsive web experiences.

## Table of Contents

- [AstraLumen](#astralumen)
- [Key Features](#key-features)
- [Visual Preview](#visual-preview)
- [Installation Guide](#installation-guide)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [Development Scripts](#development-scripts)
- [Project Structure](#project-structure)
- [Technical Documentation](#technical-documentation)
  - [Core Technologies](#core-technologies)
- [Author](#author)
- [License](#license)
- [Contributing Guidelines](#contributing-guidelines)
  - [Contribution Requirements](#contribution-requirements)
- [Support and Contact](#support-and-contact)
- [Acknowledgements](#acknowledgements)

## Key Features

* **Next.js 15**: Built on the latest version for optimal performance and enhanced developer experience.
* **Tailwind CSS**: Utilizing the powerful utility-first CSS framework for rapid and maintainable development.
* **Shadcn UI**: Integration of beautifully crafted and accessible UI components.
* **Responsive Design**: Engineered for seamless experience across all devices and screen sizes.
* **Dark Mode**: Professional implementation of light and dark themes.
* **TypeScript**: Enhanced type safety and improved development workflow.
* **Performance Optimization**: Implemented best practices for lightning-fast load times and optimized assets.
* **SEO Enhancement**: Pre-configured with industry-standard SEO practices.
* **Deployment Ready**: Optimized for deployment on Vercel, Netlify, and other major platforms.

## Visual Preview

![AstraLumen Screenshot](/public/astralumen.png)

## Installation Guide

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn package manager

### Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/idugeni/astralumen.git
    ```

2. Navigate to the project directory:

    ```bash
    cd astralumen
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Initialize development server:

    ```bash
    npm run dev
    ```

## Development Scripts

The following scripts are available for development and deployment:

```bash
# Development server with Turbopack and HTTPS
npm run dev

# Production build
npm run build

# Production server
npm run start

# Code quality check
npm run lint

# TypeScript type checking
npm run check-types
```

## Project Structure

```sh
astralumen/
├─ .github
│  ├─ ISSUE_TEMPLATE
│  │  ├─ bug_report.md
│  │  └─ feature_request.md
│  ├─ workflows
│  │  └─ codeql.yml
│  ├─ FUNDING.yml
│  └─ PULL_REQUEST_TEMPLATE.md
├─ public
│  ├─ astralumen.png
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  └─ setup
│  │  │     └─ route.ts
│  │  ├─ setup
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ icon.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ setup
│  │  │  ├─ GeneralSettingsForm.tsx
│  │  │  └─ MetadataSettingsForm.tsx
│  │  ├─ ui
│  │  │  ├─ accordion.tsx
│  │  │  ├─ alert-dialog.tsx
│  │  │  ├─ alert.tsx
│  │  │  ├─ aspect-ratio.tsx
│  │  │  ├─ avatar.tsx
│  │  │  ├─ badge.tsx
│  │  │  ├─ breadcrumb.tsx
│  │  │  ├─ button.tsx
│  │  │  ├─ calendar.tsx
│  │  │  ├─ card.tsx
│  │  │  ├─ carousel.tsx
│  │  │  ├─ chart.tsx
│  │  │  ├─ checkbox.tsx
│  │  │  ├─ collapsible.tsx
│  │  │  ├─ command.tsx
│  │  │  ├─ context-menu.tsx
│  │  │  ├─ dialog.tsx
│  │  │  ├─ drawer.tsx
│  │  │  ├─ dropdown-menu.tsx
│  │  │  ├─ form.tsx
│  │  │  ├─ hover-card.tsx
│  │  │  ├─ input-otp.tsx
│  │  │  ├─ input.tsx
│  │  │  ├─ label.tsx
│  │  │  ├─ menubar.tsx
│  │  │  ├─ navigation-menu.tsx
│  │  │  ├─ pagination.tsx
│  │  │  ├─ popover.tsx
│  │  │  ├─ progress.tsx
│  │  │  ├─ radio-group.tsx
│  │  │  ├─ resizable.tsx
│  │  │  ├─ scroll-area.tsx
│  │  │  ├─ select.tsx
│  │  │  ├─ separator.tsx
│  │  │  ├─ sheet.tsx
│  │  │  ├─ sidebar.tsx
│  │  │  ├─ skeleton.tsx
│  │  │  ├─ slider.tsx
│  │  │  ├─ sonner.tsx
│  │  │  ├─ switch.tsx
│  │  │  ├─ table.tsx
│  │  │  ├─ tabs.tsx
│  │  │  ├─ textarea.tsx
│  │  │  ├─ toggle-group.tsx
│  │  │  ├─ toggle.tsx
│  │  │  └─ tooltip.tsx
│  │  └─ theme-provider.tsx
│  ├─ constants
│  │  └─ setup.ts
│  ├─ hooks
│  │  └─ use-mobile.ts
│  ├─ lib
│  │  ├─ config.ts
│  │  ├─ Metadata.ts
│  │  └─ utils.ts
│  ├─ services
│  │  └─ setupService.ts
│  └─ types
│     ├─ env.d.ts
│     └─ setup.ts
├─ .gitattributes
├─ .gitignore
├─ CODE_OF_CONDUCT.md
├─ components.json
├─ CONTRIBUTING.md
├─ eslint.config.mjs
├─ LICENCE
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ SECURITY.md
├─ SUPPORT.md
├─ tsconfig.json
└─ turbo.json
```

## Technical Documentation

### Core Technologies

* **Framework**: Next.js 15
* **Styling**: Tailwind CSS
* **UI Components**: Shadcn UI
* **Language**: TypeScript
* **Build Tool**: Turbopack
* **Deployment**: Vercel-optimized

## Author

***Eliyanto Sarage***

* GitHub: [@idugeni](https://github.com/idugeni)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contributing Guidelines

We welcome contributions to improve AstraLumen. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

### Contribution Requirements

* Maintain existing code style
* Add appropriate documentation
* Include relevant tests
* Update README if necessary

## Support and Contact

For support, questions, or feedback:

* **Issues**: [GitHub Issues](https://github.com/idugeni/astralumen/issues)
* **Email**: [officialelsa21@gmail.com](mailto:officialelsa21@gmail.com)

## Acknowledgements

We extend our gratitude to the creators and maintainers of:

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Shadcn UI](https://ui.shadcn.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vercel](https://vercel.com/)

And all contributors who have helped shape this project.

---

Consider starring this repository if you find AstraLumen useful for your projects.
