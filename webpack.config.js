var path = require('path');
var DefinePlugin = require('webpack').DefinePlugin;

module.exports = {
     entry: ['babel-register', 'babel-polyfill', path.join(__dirname, 'public/component/App.js')],
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
                    presets: ['es2015', 'react', 'stage-2']
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
     },
     plugins: [
        new DefinePlugin({
            ADMIN_API_URL: JSON.stringify('/api')
        })
     ]
 }