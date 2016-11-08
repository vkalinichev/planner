import { push } from 'react-router-redux';
import { maxId } from '../helpers';
import api from '../api/api'


export const addProject = ( name ) => ( dispatch ) =>
    api.addProject( { name } )
        .then( json =>
            dispatch( fetchProjects() )
                .then( ()=> dispatch( push( `/${ json.id }` ) ) )
        )

export const deleteProject = ( id ) => ( dispatch ) =>
    api.deleteProject( id )
        .then( ()=>
            dispatch( fetchProjects() )
                .then( ()=> console.log( 'deleted' ) )
        )


export const addTask = ( task = {} )=> ( dispatch, getState )=> {
    task.id = maxId( getState().tasks );
    dispatch( { type: 'ADD_TASK', data: task } );
    dispatch( push( `/${ task.projectId }/${ task.id }` ) )
};
export const updateTask = ( task )=> ({ type: 'UPDATE_TASK', data: task });
export const deleteTask = ( taskId )=> ({ type: 'DELETE_TASK', data: taskId });
export const filterTasks = ( query )=> ({ type: 'FILTER_TASKS', data: query });


export const receiveProjects = ( data )=> ({ type: 'RECEIVE_PROJECTS', data: data })
export const receiveTasks = ( data )=> ({ type: 'RECEIVE_TASKS', data: data })

export const fetchProjects = ()=>
    ( dispatch )=>
        api.getProjects()
            .then( json => dispatch( receiveProjects( json ) ) )


export const fetchTasks = ()=>
    ( dispatch )=>
        api.getTasks()
            .then( json => dispatch( receiveTasks( json ) ) )

export const authRequest = () => ( { type: 'AUTH_REQUEST' } )
export const authReceive = ( data ) => ( { type: 'AUTH_RECEIVE', data } )
export const authorize = () =>
    ( dispatch )=> {
        dispatch( authRequest() )
        return api.auth().then( json => dispatch( authReceive( json.success ) ) )
    }
