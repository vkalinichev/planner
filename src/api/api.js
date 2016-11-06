export default {

    getProjects: ()=> fetch( '/projects' ).then( res => res.json() ),

    addProject: ( project )=>
        fetch( '/projects', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( project )
        })
        .then( res => res.json() )
    ,

    deleteProject: ( id )=>
        fetch( `/projects/${ id }`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( id )
        })
    ,

    updateProject: ( project )=> {
        return fetch( `/projects/${ project.id }`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( project )
        })
    },

    getTasks: ()=> fetch( '/tasks' ).then( res => res.json() )
}
