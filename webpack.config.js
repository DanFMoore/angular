var webpack = require("webpack");
var isDev = process.argv.indexOf('--dev') > -1;

module.exports = {
    entry: './app/index.js',
    externals: {
        angular: 'angular'
    },
    output: {
        path: "./public/scripts",
        filename: "bundle.js"
    },
    plugins: isDev ?
        [] :
        [new webpack.optimize.UglifyJsPlugin({minimize: true})],
    devtool: isDev ? 'source-map' : null,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
