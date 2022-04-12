// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx', // our entry point, as mentioned earlier
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/, // matches .js, .ts, and .tsx files
                loader: 'babel-loader', // uses babel-loader for the specified file types (no ts-loader needed)
                exclude: /node_modules/, 
            },
            {
                test: /\.css$/, // matches .css files only (i.e. not .scss, etc)
                use: ['style-loader', 'css-loader'], 
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'static/bundle.js', // our output bundle
    },
    devServer: {
        port: 5000,
        static: {
            directory: path.join(__dirname, './'),
            publicPath: '/',
        }
    },
    plugins: [
        // Re-generate index.html with injected script tag.
        // The injected script tag contains a src value of the
        // filename output defined above.
        new HtmlWebpackPlugin({
          inject: true,
          template: path.join(__dirname, './index.html'),
        }),
      ],
    devtool: 'eval-source-map', // builds high quality source maps
}