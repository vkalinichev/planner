const webpackMerge = require( 'webpack-merge' );

const common = require( './config/webpack/webpack.common' );
const dev = require( './config/webpack/webpack.dev' );
const prod = require( './config/webpack/webpack.prod' );

switch ( process.env.NODE_ENV ) {
    case "production":
        module.exports = webpackMerge( common, prod );
        break;
    default:
        module.exports = webpackMerge( common, dev );
}
