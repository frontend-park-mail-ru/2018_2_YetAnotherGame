const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./public/js/main.js",
    output: {
        filename: "build.js",
        path: path.join(__dirname, "public/out")
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            },
                "css-loader"
            ]
        }, {
            test: /\.(png|jpg|svg|ttf)$/,
            loader: "url-loader?name=[path][name].[ext]&limit=4096"
        }, {
            test: /\.xml$/,
            use: {
                loader: "fest-loader"
            }
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
    ],
    node: {
        fs: "empty"
    }
}
