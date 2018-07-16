module.exports = {
    moduleFileExtensions: ["js", "ts", "tsx"],
    moduleNameMapper: {
      // '\\.(css|scss)$': 'identity-obj-proxy',
      // '@utils\/(.*)': '<rootDir>/src/utils/$1',
      // '@components\/(.*)': '<rootDir>/src/components/$1',
      // '@constants\/(.*)': '<rootDir>/src/constants/$1',
      // '@styles\/(.*)': '<rootDir>/src/styles/$1',
    },
    // coveragePathIgnorePatterns: [
    //   "/node_modules/",
    //   "/components\/index/",
    //   "/utils/"
    // ],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['<rootDir>/test/__specs__/**/?(*.)(spec|test).ts?(x)'],
    verbose: true
  }
  