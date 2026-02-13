# FlatInstall

<img src="./images/icon.png" width=128 />

Site estático que gera um script automatizado para instalar aplicativos Flatpak.

![GitHub license](https://img.shields.io/github/license/diegoarauj0/flatInstall-web?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/diegoarauj0/flatInstall-web?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/diegoarauj0/flatInstall-web?style=for-the-badge)

## 📌 Tecnologias utilizadas

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

- **Tailwindcss**
- **Typescript**
- **React**
- **Vite**
- **i18next**
- **fuse.js**

## 📷 Screenshots

<img src="./images/screenshot.gif" />

## ✨ Funcionalidades

- Busca de aplicativos com fuzzy search (`fuse.js`)
- Geração automática de script Bash para instalação via Flatpak
- Cópia do script para a área de transferência
- Internacionalização com `i18next` (`en` e `pt`)

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
npm ci
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

## 🌍 Deploy (GitHub Pages)

O projeto possui workflow em `.github/workflows/deploy-gh-pages.yml` que publica no `gh-pages` quando uma nova tag de versão é enviada.

### Publicar nova versão

```bash
git checkout main
git pull
git tag v1.0.0
git push origin v1.0.0
```

Após isso, o GitHub Actions:

- faz checkout da `main`
- roda `npm ci` e `npm run build`
- publica `dist/` na branch `gh-pages`

## 📄 Licença

Este projeto é open-source e está disponível sob a licença MIT.
