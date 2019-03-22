const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mode = process.env.NODE_ENV === "development" ? "development" : "production";

const main = {
    target: "electron-main",
    mode,
    entry: path.resolve(__dirname, "src", "main", "main.ts"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules"),
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    }
};

const renderer = {
    target: "electron-renderer",
    mode,
    entry: path.resolve(__dirname, "src", "renderer"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "renderer.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules"),
                loader: "ts-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, "src", "index.html")
            }
        )
    ],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"]
    }
};

exports.default = [
    main,
    renderer
];
