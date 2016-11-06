const co = require( 'co' )
const parse = require( 'co-body' )
const monk = require( 'monk' )
const wrap = require( 'co-monk' )
const db = monk( 'localhost/planner' )

const tasks = wrap( db.get( 'tasks' ) )

module.exports.all = function * all ( next ) {
    if ( 'GET' != this.method ) return yield next
    this.body = yield tasks.find( {} )
}

module.exports.fetch = function * fetch ( id, next ) {
    if ( 'GET' != this.method ) return yield next
    // Quick hack.
    if ( id === "" + parseInt( id, 10 ) ) {
        var task = yield tasks.find( {}, {
            'skip': id - 1,
            'limit': 1
        } )
        if ( task.length === 0 ) {
            this.throw( 404, 'task with id = ' + id + ' was not found' )
        }
        this.body = yield task
    }
}

module.exports.add = function * add ( data, next ) {
    if ( 'POST' != this.method ) return yield next
    var task = yield parse( this, {
        limit: '1kb'
    } )
    var inserted = yield tasks.insert( task )
    if ( !inserted ) {
        this.throw( 405, "The task couldn't be added." )
    }
    this.body = 'Done!'
}

module.exports.modify = function * modify ( id, next ) {
    if ( 'PUT' != this.method ) return yield next

    var data = yield parse( this, {
        limit: '1kb'
    } )

    var task = yield tasks.find( {}, {
        'skip': id - 1,
        'limit': 1
    } )

    if ( task.length === 0 ) {
        this.throw( 404, 'task with id = ' + id + ' was not found' )
    }

    var updated = tasks.update( task[ 0 ], {
        $set: data
    } )

    if ( !updated ) {
        this.throw( 405, "Unable to update." )
    } else {
        this.body = "Done"
    }
}

module.exports.remove = function * remove ( id, next ) {
    if ( 'DELETE' != this.method ) return yield next

    var task = yield tasks.find( {}, {
        'skip': id - 1,
        'limit': 1
    } )

    if ( task.length === 0 ) {
        this.throw( 404, 'book with id = ' + id + ' was not found' )
    }

    var removed = tasks.remove( task[ 0 ] )

    if ( !removed ) {
        this.throw( 405, "Unable to delete." )
    } else {
        this.body = "Done"
    }

}
