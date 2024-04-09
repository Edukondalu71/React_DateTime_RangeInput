const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/Components/DateTimeRangeInputComponent/DateTimeRangeInputComponent',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: "react-datetimerangeinput",
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',  // Adds CSS to the DOM by injecting a `<style>` tag
          'css-loader',    // Translates CSS into CommonJS
          'sass-loader'    // Compiles Sass to CSS
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../Images', // Output directory for SVG files
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',  // Adds CSS to the DOM by injecting a `<style>` tag
          'css-loader',    // Translates CSS into CommonJS
          'sass-loader'    // Compiles Sass to CSS
        ],
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
