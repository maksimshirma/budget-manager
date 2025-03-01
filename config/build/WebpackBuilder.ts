import path from 'path';
import { Configuration, WebpackPluginInstance } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export class WebpackBuilder {
  private dirname: string;
  private config: Configuration;

  constructor(dirname: string) {
    this.dirname = dirname;
    this.config = {
      mode: 'development',
      entry: path.resolve(this.dirname, 'src', 'main.tsx'),
      output: {
        path: path.resolve(this.dirname, 'build'),
        filename: '[name].[contenthash].js',
        clean: true,
        publicPath: '/',
      },
      module: {
        rules: [],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
        alias: {
          '@': path.resolve(this.dirname, 'src'),
          '@app': path.resolve(this.dirname, 'src', 'app'),
          '@pages': path.resolve(this.dirname, 'src', 'pages'),
          '@widgets': path.resolve(this.dirname, 'src', 'widgets'),
          '@features': path.resolve(this.dirname, 'src', 'features'),
          '@entities': path.resolve(this.dirname, 'src', 'entities'),
          '@shared': path.resolve(this.dirname, 'src', 'shared'),
        },
      },
      plugins: [],
    };
  }

  setMode(mode: BuildMode) {
    this.config.mode = mode;
    return this;
  }

  setEntry(...args: string[]) {
    this.config.entry = path.resolve(this.dirname, ...args);
    return this;
  }

  addScssLoader(includeMiniCssExtract?: boolean) {
    this.config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: [includeMiniCssExtract ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
    });
    return this;
  }

  addFontsLoader() {
    this.config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    return this;
  }

  addAssetsLoader() {
    this.config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    });
    return this;
  }

  addSvgrLoader() {
    this.config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'convertColors',
                  params: {
                    currentColor: true,
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return this;
  }

  addTsLoader(includeFastRefresh?: boolean) {
    if (includeFastRefresh) {
      if (!this.config.devServer) {
        this.config.devServer = {};
      }
      this.config.devServer.hot = true;
      this.config.devServer.open = true;
      this.config.plugins.push(
        new ReactRefreshWebpackPlugin()
      )
    }

    const options = includeFastRefresh ? {
      getCustomTransformers: () => ({
        before: [ReactRefreshTypeScript()],
      }),
      transpileOnly: true,
    } : undefined;

    this.config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options,
        },
      ],
    })

    return this;
  }

  addBabelLoader() {
    // TODO: add babel loader config
    return this;
  }

  addExtensions(extensions: string[]) {
    this.config.resolve.extensions.push(...extensions);
    return this;
  }

  addAlias(key: string, ...args: string[]) {
    (this.config.resolve.alias as Record<string, string>)[key] = path.resolve(this.dirname, ...args);
    return this;
  }

  addPlugin(plugin: WebpackPluginInstance) {
    this.config.plugins.push(plugin);
    return this;
  }

  addDevServer(devServer: Configuration['devServer']) {
    this.config.devServer = devServer;
    return this;
  }

  build(): Configuration {
    return this.config;
  }
}
