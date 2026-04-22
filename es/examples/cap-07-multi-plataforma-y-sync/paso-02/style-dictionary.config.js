// Configuracion de Style Dictionary, exactamente la que aparece en el
// snippet del libro (capitulo 7). Lee tokens/, emite cuatro outputs.

module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
        },
      ],
    },
    ios: {
      transformGroup: "ios-swift",
      buildPath: "build/ios/",
      files: [
        {
          destination: "Tokens.swift",
          format: "ios-swift/class.swift",
          className: "DSTokens",
        },
      ],
    },
    android: {
      transformGroup: "compose",
      buildPath: "build/android/",
      files: [
        {
          destination: "Tokens.kt",
          format: "compose/object",
          className: "DSTokens",
          packageName: "com.miempresa.ds",
        },
      ],
    },
    flutter: {
      transformGroup: "flutter",
      buildPath: "build/flutter/",
      files: [
        {
          destination: "tokens.dart",
          format: "flutter/class.dart",
          className: "DSTokens",
        },
      ],
    },
  },
};
