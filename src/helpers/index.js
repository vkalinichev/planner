export const maxId = ( collection )=> Math.max.apply( null, collection.map( p=>p.id )) + 1;
