import { push } from 'react-router-redux';
import { maxId } from '../helpers';

export const addProject = ( name )=> ( dispatch, getState )=> {
    const id = maxId( getState().projects );
    dispatch( { type: 'ADD_PROJECT', data: { id, name } } );
    dispatch( push( `/${ id }` ) )
};

export const deleteProject = ( projectId )=> ({ type: 'DELETE_PROJECT', data: projectId });
export const showAddProject = ()=> ({ type: 'SHOW_ADD_PROJECT' });
export const hideAddProject = ()=> ({ type: 'HIDE_ADD_PROJECT' });

export const addTask = ( task )=> ({ type: 'ADD_TASK', data: task });

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
