var webpack = require("webpack");
var isDev = process.argv.indexOf('--dev') > -1;

module.exports = {
    entry: './app/index.js',
    externals: {
        // This stops angular being bundled up and assumes you are loading from another script tag
        angular: 'angular'
    },
    output: {
        path: "./public/scripts",
        filename: "bundle.js"
    },
    plugins: isDev ?
        [] :
        // minifies the output if webpack is run without --dev
        [new webpack.optimize.UglifyJsPlugin({minimize: true})],
    devtool: isDev ? 'source-map' : null,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    // Allows for es6 syntax
                    presets: ['es2015']
                }
            }
        ]
    }
};
