const superagent = require( 'supertest' )
const app = require( '../app' )

function request () {
    return superagent( app.listen() )
}

describe( 'Routes', function () {
    describe( 'GET /', function () {
        it( 'should return 200', function ( done ) {
            request()
                .get( '/' )
                .expect( 200, done )
        } )
    } )
    describe( 'GET /tasks', function () {
        it( 'should return 200', function ( done ) {
            request()
                .get( '/tasks' )
                .expect( 'Content-Type', /json/ )
                .expect( 200, done )
        } )
    } )
    describe( 'GET /tasks/notfound', function () {
        it( 'should return 404', function ( done ) {
            request()
                .get( '/tasks/notfound' )
                .expect( 404, done )
        } )
    } )
} )
