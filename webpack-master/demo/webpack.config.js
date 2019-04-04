const  path = require('path');
const  HtmlWebpackPlugin = require('html-webpack-plugin');
const  ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const  webpack = require('webpack');

const env = process.env.NODE_ENV;

let config = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        hot: true,
        host: 'localhost',
        port: 9000,
        contentBase: path.resolve(__dirname, '/dist'),
        compress: true
    },
    module: {
        rules: [{
                test: /\.css$/,
                // use:['style-loader','css-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: './images/',
                        limit: 500,
                        publicPath: '../images'
                    }
                }]
            }
            ,
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
    	new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: 'index.html'
        }),
        new ExtractTextPlugin('css/[name].[hash:8].css'),
       /* new CleanWebpackPlugin('dist/*.*', {
      		root: __dirname,
      		verbose: true,
      		dry: false
  		}),*/
        new webpack.HotModuleReplacementPlugin()
    ]
};

if( env === "development" ){
    console.log("!!!!!PPPP")
}
console.log(env, '------env');
module.exports = config;
 

