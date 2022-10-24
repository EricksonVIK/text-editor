const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin')

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
			new HtmlWebpackPlugin({
				title: 'JATE',
				favicon: './src/images/logo.png',
				template: './index.html',
				publicPath: '/',
			}),
			new InjectManifest({
				swSrc: '/src-sw.js',
				swDest: 'src-sw.js',
			}),
			new WebpackPwaManifest({
				name: 'Just Another Text Editor',
				short_name: 'JATE',
				description:
					'A text editor that also uses a service worker to work on and offline',
				background_color: '#225ca3',
				theme_color: '#225ca3',
				fingerprints: false,
				includeDirectory: true,
				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 256],
						destination: path.join('assets', 'icons'),
					},
				],
			}),
		],
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", {targets: "defaults"}]
              ]
            }
          }
        }
      ],
    },
  };
};
