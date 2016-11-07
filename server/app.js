const session = require( 'koa-generic-session' )
const bodyParser = require( 'koa-bodyparser' )
const compress = require( 'koa-compress' )
const passport = require( 'koa-passport' )
const Router = require( 'koa-router' )
const logger = require( 'koa-logger' )
const serve = require( 'koa-static' )
const koa = require( 'koa' )
const app = module.exports = koa()
const tasks = require( './controllers/tasks' )
const projects = require( './controllers/projects' )
const { API_SERVER: { HOST, PORT }, PATHS: { BUILD } } = require( '../config' )

app.use( logger() )

app.proxy = true

app.keys = [ 'your-session-secret' ]
app.use( session() )

app.use( bodyParser() )

require( './auth/auth' )
app.use( passport.initialize() )
app.use( passport.session() )

var pub = new Router()

pub.post( '/auth', function* ( next ) {
    var ctx = this
    yield passport.authenticate( 'local', function* ( err, user, info ) {
        if ( err ) throw err
        if ( user === false ) {
            ctx.status = 401
            ctx.body = { success: false }
        } else {
            yield ctx.login( user )
            ctx.body = { success: true }
        }
    } ).call( this, next )
} )

pub.post( '/login', passport.authenticate( 'local', {
    successRedirect: '/',
    failureRedirect: '/'
} ) )

pub.get( '/logout', function* ( next ) {
    this.logout()
    this.redirect( '/' )
} )

app.use( pub.middleware() )

app.use( serve( BUILD ) )

// Require authentication for now
app.use( function* ( next ) {
    if ( this.isAuthenticated() ) {
        yield next
    } else {
        this.redirect( '/non-authorized' )
    }
} )

var api = new Router()

api
    .get( '/app', () => console.log( 'authorized' ) )
    .get( '/projects/', projects.all )
    .get( '/projects/:id', projects.fetch )
    .post( '/projects/', projects.add )
    .put( '/projects/:id', projects.modify )
    .delete( '/projects/:id', projects.remove )

api
    .get( '/tasks/', tasks.all )
    .get( '/tasks/:id', tasks.fetch )
    .post( '/tasks/', tasks.add )
    .put( '/tasks/:id', tasks.modify )
    .delete( '/tasks/:id', tasks.remove )

app.use( api.middleware() )
app.use( compress() )

app.listen( PORT, ()=>
    console.log( `Server started at http://${ HOST }:${ PORT }` )
)
