const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  // Async bootstrap entry — obligatoire avec Module Federation.
  // Voir src/bootstrap.js pour l'explication.
  entry: './src/bootstrap.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // 'auto' = Webpack déduit l'URL de base depuis le navigateur au runtime.
    // Nécessaire pour que le Shell charge correctement les chunks du remote.
    publicPath: 'auto',
    clean: true,
  },

  devServer: {
    // Port différent du Shell (3000). Chaque micro-frontend tourne de façon
    // indépendante sur son propre port.
    port: 3001,
    hot: true,
    headers: {
      // Le Shell (localhost:3000) va fetcher remoteEntry.js depuis ce serveur
      // (localhost:3001). Sans ce header, le navigateur bloque la requête
      // (politique CORS : origines différentes = ports différents).
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
      // Donne un nom stable à ce fichier local pour que le shared de MF
      // puisse l'identifier comme singleton entre tous les MFEs.
      'shared/eventBus': path.resolve(__dirname, 'src/shared/eventBus.js'),
    },
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    // HtmlWebpackPlugin — page HTML pour le développement en isolation.
    // Quand le Shell charge ce remote, il ne touche PAS à ce HTML.
    // Il ne télécharge QUE remoteEntry.js puis les chunks exposés.
    // Cette page sert uniquement à l'équipe Header pour tester son composant seul.
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    // ============================================================
    // MODULE FEDERATION — Header (remote)
    // ============================================================
    new ModuleFederationPlugin({
      // Nom unique dans la fédération.
      // DOIT correspondre au préfixe déclaré dans le Shell :
      //   remotes: { header: 'header@http://localhost:3001/remoteEntry.js' }
      //                        ↑ ce 'header' ici
      name: 'header',

      // Le fichier manifest que Webpack génère et expose via le devServer.
      // Le Shell le télécharge au runtime pour découvrir ce que ce remote expose.
      // Convention universelle : toujours 'remoteEntry.js'.
      filename: 'remoteEntry.js',

      // Surface publique de ce micro-frontend.
      // Gauche  = chemin d'import utilisé par le Shell : import('header/Header')
      // Droite  = fichier source local qui l'implémente
      // Seul ce qui est listé ici est accessible depuis l'extérieur.
      exposes: {
        './Header': './src/Header.jsx',
      },

      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        // eventBus partagé en singleton : une seule instance dans le navigateur,
        // même si mfe-header et mfe-lobby ont chacun une copie du fichier.
        // requiredVersion: false empêche l'avertissement Webpack car c'est un fichier local.
        'shared/eventBus': { singleton: true, requiredVersion: false },
      },
    }),
  ],
};
