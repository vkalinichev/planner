const fs = require('fs');

let config = require( './default' );

if ( fs.existsSync( './local' )) {
    config = Object.assign( {}, config, require( './local' ) );
}

module.exports = config;
