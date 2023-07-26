const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        panel: "./src/panel.js",
        default: "./src/default.js",
        index: "./src/index.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "ChatNode",
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
    },
    optimization: {
        runtimeChunk: "single",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
