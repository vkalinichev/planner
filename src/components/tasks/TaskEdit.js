import { Component } from 'react';
import { connect } from 'react-redux';

import Task from './Task';
import { addTask, updateTask, deleteTask } from '../../actions/actions'

const mapStateToProps = ({ tasks }, { params: { projectId, taskId } })=> ({
    projectId,
    task: tasks.filter( task => task.id === parseInt( taskId, 10 ))[0]
});

const mapDispatchToProps = ( dispatch )=> ({
    onAdd( task ) { dispatch( addTask( task )) },
    onSave( task ) { dispatch( updateTask( task )) },
    onDelete( taskId ) { dispatch( deleteTask( taskId )) }
});

const TaskEdit = connect( mapStateToProps, mapDispatchToProps )( Task );

export default TaskEdit;
