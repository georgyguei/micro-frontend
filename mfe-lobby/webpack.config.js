const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/bootstrap.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'auto',
    clean: true,
  },

  devServer: {
    port: 3002,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      // Même clé que dans mfe-header et shell → même instance singleton au runtime.
      'shared/eventBus': path.resolve(__dirname, 'src/shared/eventBus.js'),
    },
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),

    // ============================================================
    // MODULE FEDERATION — Lobby (remote)
    // ============================================================
    new ModuleFederationPlugin({
      name: 'lobby',
      filename: 'remoteEntry.js',

      exposes: {
        './Lobby': './src/Lobby.jsx',
      },

      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        // Même contrat singleton que mfe-header — garantit qu'un seul
        // eventBus existe dans le navigateur entre tous les MFEs.
        // requiredVersion: false empêche l'avertissement Webpack car c'est un fichier local.
        'shared/eventBus': { singleton: true, requiredVersion: false },
      },
    }),
  ],
};
