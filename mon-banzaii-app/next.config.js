/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    env: {
      host: "localhost",
      port: 3306,
      // database: "Mon-Banzaii",
      database: "test-me",
      user: "nextjs",
      password: "Nextjs!1510",
      rootURL: this.host + this.port,
    },
    secret: "what do you think should be a good secret used to sign JWT (JSON Web Tokens)?"
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api' // Development API URL
    : 'http://localhost:3000/api' // Production API URL
  },
  // ------------------------------------------------
  // Specific Configurations
  // ------------------------------------------------
  // Let's configure a bit webpack
  // webpack: (config) => {
  //   // This is a workaround on webpack where an issue is raised
  //   // because it can't find the native NodeJS `fs` module.
  //   // As such, we deactivate the use of FS by setting
  //   // `fs` to false in the ditionnary `config.resolve.fallback`.
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // }
}
