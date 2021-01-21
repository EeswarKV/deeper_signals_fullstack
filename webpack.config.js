const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

    return {
        devtool: isDevelopment && "cheap-module-source-map",
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "assets/js/[name].[contenthash:8].js",
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            envName: isProduction ? "production" : "development"
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                    exclude: /node_modules/,
                    use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
                  },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    loader: require.resolve("file-loader"),
                    options: {
                        name: "static/media/[name].[hash:8].[ext]"
                    }
                }
            ]
        },
        resolve: {
            extensions: [".js", ".jsx"]
        },
        plugins: [
            new webpack.DefinePlugin({
                 "process.env.NODE_ENV": JSON.stringify(
                   isProduction ? "production" : "development"
                 )
            }),
            new HtmlWebpackPlugin({
                  template: path.resolve(__dirname, "public/index.html"),
                  inject: true
            }),
            new webpack.ProvidePlugin({
                "React": "react",
             })
          ]
    };
  
};