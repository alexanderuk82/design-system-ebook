// Style Dictionary config, exactly the snippet that appears in
// chapter 7 of the book. Reads tokens/, emits four outputs.

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
          packageName: "com.yourcompany.ds",
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
