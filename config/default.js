const path = require( 'path' );

module.exports = {

    APP: {
      NAME: "Planner"
    },

    API_SERVER: {
        HOST: "localhost",
        PORT: 8888
    },

    DEV_SERVER: {
        HOST: "localhost",
        PORT: 3333
    },

    PATHS: {
        SRC: path.join( __dirname, "../src" ),
        BUILD: path.join( __dirname, "../build" )
    }

};
