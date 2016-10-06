const path = require( 'path' );

const isProd = process.env.NODE_ENV === "production";

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
