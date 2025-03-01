import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import 'webpack-dev-server';
import { WebpackBuilder } from './config';

export default (env: IWebpackEnv) => {
  const mode = env.mode ?? 'development';
  const port = env.port ?? 5173;

  const isDev = mode === 'development';

  let config: Configuration;

  if (isDev) {
    config = new WebpackBuilder(__dirname)
      .setMode('development')
      .addTsLoader(true)
      .addScssLoader(false)
      .addAssetsLoader()
      .addFontsLoader()
      .addSvgrLoader()
      .addPlugin(new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.webp'),
      }))
      .addDevServer({
        port,
        historyApiFallback: true,
        compress: true,
        allowedHosts: 'all',
        hot: true,
        open: true,
      })
      .build();
  } else {
    config = new WebpackBuilder(__dirname)
      .setMode('production')
      .addTsLoader()
      .addScssLoader(true)
      .addAssetsLoader()
      .addFontsLoader()
      .addSvgrLoader()
      .addPlugin(new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.webp'),
      }))
      .addPlugin(new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }))
      .build();
  }

  return config;
};
