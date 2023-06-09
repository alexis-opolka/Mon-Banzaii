# SAE - tutoriel d'installation

----

## Prérequis

- Un navigateur Web
- NodeJS
- Git

## Téléchargement du projet

Pour télécharger le projet, faites:

```sh
git clone git@github.com:alexis-opolka/Mon-Banzaii.git

ou

git clone https://github.com/alexis-opolka/Mon-Banzaii.git
```

puis allez dans le dossier du projet:

```sh
cd Mon-Banzaii
```

## Installation

Allez dans le dossier de l'application NextJS:

```sh
cd mon-banzaii-app
```

Puis installez les dépendances:

```sh
npm i
```

## Configuration de l'application

L'application utilise un système de variables d'environnement
liées à un fichier `next.config.js`, fichier qui n'est pas présent
dans le projet git, pour des raisons de sécurité.

Il vous faudra alors créer un fichier `next.config.js` puis
y ajouter les variables d'environnement suivantes:

```js
// next.config.js
// This file shouldn't be uploaded anywhere, it is to be ignored
// by GIT and shouldn't be explicitely push to the repo

module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    env: {
      host: "YOUR_HOST",
      port: YOUR_PORT,
      database: "YOUR_DATABASE_NAME",
      user: "DEDICATED_MYSQL_USER",
      password: "DEDICATED_MYSQL_USER_PASSWORD"
    },
    secret: "YOUR_SECRET_KEY"
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api' // Development API URL
    : 'htpp://localhost:3000/api' // Production API URL
  },
  // Let's configure a bit webpack
  webpack: (config) => {
    // This is a workaround on webpack where an issue is raised
    // because it can't find the native NodeJS `fs` module.
    // As such, we deactivate the use of FS by setting
    // `fs` to false in the dictionary `config.resolve.fallback`.
    config.resolve.fallback = { fs: false };

    return config;
  },
  // Let's define the build related settings
  output: 'node .next/standalone/server.js'
}
```

où `YOUR_HOST`, `YOUR_PORT`, `YOUR_DATABASE_NAME`, 
`DEDICATED_MYSQL_USER`, `DEDICATED_MYSQL_USER_PASSWORD` sont
vos informations de connexion au SGBD MySQL.

`SECRET_KEY` est une clé secrète utilisée pour le 
chiffrement de notre JWT.

## Lancement de l'application

Pour lancer l'application, faites:

```sh
npm run dev
```

## Accès au site web

une fois le docker lancé vous pouvez accéder au site web en tapant l'adresse suivante dans votre navigateur web : [http://localhost:3000](http://localhost:3000)

----

## Copyright &copy; Lucas Simpol Augeray & Alexis Opolka 2023 - All Rights Reserved
