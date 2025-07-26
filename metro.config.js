// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Força o Metro a tratar os pacotes @firebase/* como ESM
config.resolver.resolveRequest = (context, moduleImport, platform) => {
  if (moduleImport.startsWith('@firebase/')) {
    return context.resolveRequest(
      {
        ...context,
        isESMImport: true,
      },
      moduleImport,
      platform
    );
  }

  return context.resolveRequest(context, moduleImport, platform);
};

// (Opcional) Desativa suporte ao "exports" do package.json
// Pode ajudar com alguns pacotes que causam conflito com ESM/CJS
// config.resolver.unstable_enablePackageExports = false;

module.exports = config;
