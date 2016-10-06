const webpack = require( 'webpack' );

module.exports = {

    resolve: {
        extensions: [ '', '.js' ]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [ 'react-hot' ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: [ 'es2015', 'react' ],
                    plugins: [
                        'transform-runtime',
                        'transform-decorators-legacy',
                        'transform-class-properties',
                        'syntax-async-functions',
                        'transform-regenerator'
                    ],
                }
            },
            {
                test: /\.eot$/,
                exclude: /node_modules/,
                loader: "file"
            },
            {
                test: /\.woff2?$/,
                exclude: /node_modules/,
                loader: "url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf$/,
                exclude: /node_modules/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.gif/,
                exclude: /node_modules/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg/,
                exclude: /node_modules/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png/,
                exclude: /node_modules/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({ React: 'react' })
    ]
};
