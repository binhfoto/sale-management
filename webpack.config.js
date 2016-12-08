var path = require('path');

module.exports = {
     entry: path.join(__dirname, 'public/component/App.js'),
     output: {
         path: path.join(__dirname, 'dist/js'),
         filename: 'bundle.js',
     },
     module: {
         loaders: [
             {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/, 
                loader: 'style-loader!css-raw-loader'
            },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            }
        ]
     }
 }