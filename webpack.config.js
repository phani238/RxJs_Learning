const HtmlWebpackPlugin = require('html-webpack-plugin');
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
module.exports = {
    entry: "./main",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "public/distSrc"),
    },
    watch: true,
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            { test: /.html$/, loader: "html-loader", },
        ]
    },
    resolve: {
        extensions: ["", ".ts", ".js"]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'index.html',
    }),
    new CopyPlugin({
        patterns: [
            {
                context: path.resolve(__dirname),
                from: "*.json",
            },
        ],
    }),],
    optimization: {
        minimize: true,
        minimizer: [
            new JsonMinimizerPlugin(),
        ],
    },
    mode: 'development'
}