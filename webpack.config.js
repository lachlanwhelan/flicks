const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'dist'),
       publicPath: '/flicks',
    },

    // used to help track down errors and warnings to original location instead of bundle
    devtool: 'inline-source-map', 

    //The webpack-dev-server provides you with a rudimentary web server and the ability to use live reloading
    devServer: {
        static: './dist',
        historyApiFallback: true, // https://ui.dev/react-router-cannot-get-url-refresh
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
              {
                test: /\.png/,
                type: 'asset/'
              }
        ]
    },
    
    //HtmlWebpackPlugin by default will generate its own index.html file, even though we already have one in the dist/ folder
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
            title: 'Flicks.'
        })
    ]
}