import { push } from 'react-router-redux';
import { maxId } from '../helpers';


export const addProject = ( name )=> ( dispatch, getState )=> {
    const id = maxId( getState().projects );
    dispatch( { type: 'ADD_PROJECT', data: { id, name } } );
    dispatch( push( `/${ id }` ) )
};
export const deleteProject = ( projectId )=> ({ type: 'DELETE_PROJECT', data: projectId });


export const addTask = ( task={} )=> ( dispatch, getState )=> {
    task.id = maxId( getState().tasks );
    dispatch( { type: 'ADD_TASK', data: task } );
    dispatch( push( `/${ task.projectId }/${ task.id }` ) )
};
export const updateTask = ( task )=> ({ type: 'UPDATE_TASK', data: task });
export const deleteTask = ( taskId )=> ({ type: 'DELETE_TASK', data: taskId });
export const filterTasks = ( query )=> ({ type: 'FILTER_TASKS', data: query });


export const receiveData = ( data )=> ({ type: 'RECEIVE_DATA', data: data });

export const fetchData = ()=> {
    return ( dispatch )=> {
        fetch( '/api/data' )
            .then( res => res.json() )
            .then( json => dispatch( receiveData( json ) )  )
    }
};
