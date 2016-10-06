const path = require( 'path' );

const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const WebpackCleanupPlugin = require( 'webpack-cleanup-plugin' );

const { APP: { APP_NAME }, PATHS: { BUILD, SRC } } = require( '..' );

module.exports = {

    entry: [
        './src/app.js'
    ],

    output: {
        path: BUILD,
        filename: 'app.js'
    },

    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract( 'style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus' )
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract( 'style', 'css' )
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin( { 'process.env.NODE_ENV': '"production"' } ),
        new webpack.optimize.UglifyJsPlugin( {
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        } ),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin( 'styles.css', { allChunks: true } ),
        new HtmlWebpackPlugin( {
            template: `${ SRC }/index.html`,
            title: APP_NAME
        } ),
        new webpack.optimize.DedupePlugin()
    ]

};
