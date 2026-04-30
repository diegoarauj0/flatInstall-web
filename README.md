# FlatInstall

<img src="./images/icon.png" width=128 />

![GitHub repo size](https://img.shields.io/github/repo-size/diegoarauj0/flatInstall-web?style=for-the-badge)
![GitHub License](https://img.shields.io/github/license/diegoarauj0/flatInstall-web?style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/diegoarauj0/flatInstall-web?style=for-the-badge)


![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 📚 Visão geral

Site estático que gera um script automatizado para instalar aplicativos Flatpak.

## 📷 Screenshots

<img src="./images/screenshot.gif" />

## ✨ Funcionalidades

- Busca de aplicativos com fuzzy search (`fuse.js`)
- Geração automática de script Bash para instalação via Flatpak
- Cópia do script para a área de transferência
- Internacionalização com `i18next` (`en` e `pt`)

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js 22+

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

## 📝 Licença

Esse projeto está sob licença MIT. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.