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
    port: 3000,
    hot: true,
    open: true,
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
      'shared/eventBus': path.resolve(__dirname, 'src/shared/eventBus.js'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    // ============================================================
    // MODULE FEDERATION — Shell (hôte)
    // ============================================================
    new ModuleFederationPlugin({
      // TODO 1 — Nommer le Shell
      // Identifiant unique de cette app dans la fédération.
      // Devient window.shell ; les remotes s'y référeront comme hôte.
      name: 'shell',

      // TODO 2 — Préparer les remotes
      // Vide pour l'instant : les micro-frontends distants arrivent en CP3.
      // Format futur : { lobby: 'lobby@http://localhost:3001/remoteEntry.js' }
      remotes: {},

      // TODO 3 — Partager React en singleton
      // Garantit qu'une seule instance de React tourne dans tout le navigateur.
      // Sans singleton: true → les hooks et contextes cassent dès qu'un remote charge.
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        'shared/eventBus': { singleton: true },
      },
    }),
  ],
};
