const compress = require( 'koa-compress' )
const logger = require( 'koa-logger' )
const serve = require( 'koa-static' )
const route = require( 'koa-route' )
const koa = require( 'koa' )
const app = module.exports = koa()
const tasks = require( './controllers/tasks' )
const projects = require( './controllers/projects' )
const { API_SERVER: { HOST, PORT }, PATHS: { BUILD } } = require( '../config' )

app.use( logger() )

app.use( route.get( '/projects/', projects.all ) )
app.use( route.get( '/projects/:id', projects.fetch ) )
app.use( route.post( '/projects/', projects.add ) )
app.use( route.put( '/projects/:id', projects.modify ) )
app.use( route.delete( '/projects/:id', projects.remove ) )

app.use( route.get( '/tasks/', tasks.all ) )
app.use( route.get( '/tasks/:id', tasks.fetch ) )
app.use( route.post( '/tasks/', tasks.add ) )
app.use( route.put( '/tasks/:id', tasks.modify ) )
app.use( route.delete( '/tasks/:id', tasks.remove ) )

app.use( serve( BUILD ) )
app.use( compress() )

app.listen( PORT, ()=>
    console.log( `Server started at http://${ HOST }:${ PORT }` )
)
