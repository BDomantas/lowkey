module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@Root': './src',
          '@State': './src/state',
          '@Screens': './src/screens',
          '@Components': './src/components',
          '@Styles': './src/styles',
        },
      },
    ],
  ],
};
