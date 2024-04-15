module.exports = {
  preset: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  //   testEnvironment: 'jest-environment-js-dom',
  testEnvironment: 'jest-environment-jsdom',
};
