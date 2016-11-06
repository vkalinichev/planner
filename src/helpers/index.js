export const maxId = ( collection )=> {
    if ( !collection || collection.length === 0 ) return 1
    return Math.max.apply( null, collection.map( p=>p.id ) ) + 1
}
