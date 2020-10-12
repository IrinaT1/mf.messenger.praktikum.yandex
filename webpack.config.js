const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = true;

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'chats.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    devServer: {
        port: 4001,
        contentBase: __dirname,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: __dirname + '/src/index.html',
          inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            }, {
                test: /\.handlebars$/,
                loader: "handlebars-loader"
            }
        ]
    }
};
