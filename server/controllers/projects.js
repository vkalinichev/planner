const co = require( 'co' )
const parse = require( 'co-body' )
const monk = require( 'monk' )
const wrap = require( 'co-monk' )
const db = monk( 'localhost/planner' )

const projects = wrap( db.get( 'projects' ) )

module.exports.all = function * all ( next ) {
    if ( 'GET' != this.method ) return yield next
    this.body = yield projects.find( {} )
}

module.exports.fetch = function * fetch ( id, next ) {
    if ( 'GET' != this.method ) return yield next
    // Quick hack.
    if ( id === "" + parseInt( id, 10 ) ) {
        var project = yield projects.find( {}, {
            'skip': id - 1,
            'limit': 1
        } )
        if ( project.length === 0 ) {
            this.throw( 404, 'project with id = ' + id + ' was not found' )
        }
        this.body = yield project
    }
}

module.exports.add = function * add ( data, next ) {
    if ( 'POST' != this.method ) return yield next
    var project = yield parse( this, {
        limit: '1kb'
    } )

    project.id = Math.round( Math.random()*100000 )
    var inserted = yield projects.insert( project )
    if ( !inserted ) {
        this.throw( 405, "The project couldn't be added." )
    }
    this.body = JSON.stringify( { id: project.id } )
}

module.exports.modify = function * modify ( id, next ) {
    if ( 'PUT' != this.method ) return yield next

    var data = yield parse( this, {
        limit: '1kb'
    } )

    var project = yield projects.find( {}, {
        'skip': id - 1,
        'limit': 1
    } )

    if ( project.length === 0 ) {
        this.throw( 404, 'project with id = ' + id + ' was not found' )
    }

    var updated = projects.update( project[ 0 ], {
        $set: data
    } )

    if ( !updated ) {
        this.throw( 405, "Unable to update." )
    } else {
        this.body = "Modified"
    }
}

module.exports.remove = function * remove ( id, next ) {
    if ( 'DELETE' != this.method ) return yield next

    var project = yield projects.find( {id}, {
        'skip': id - 1,
        'limit': 1
    } )

    if ( project.length === 0 ) {
        this.throw( 404, 'project with id = ' + id + ' was not found' )
    }

    var removed = projects.remove( project[ 0 ] )

    if ( !removed ) {
        this.throw( 405, "Unable to delete." )
    } else {
        this.body = "Deleted"
    }

}
