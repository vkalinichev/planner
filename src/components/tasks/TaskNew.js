import { Component } from 'react';
import { connect } from 'react-redux';

import Task from './Task';
import { addTask, deleteTask } from '../../actions/actions';

const mapStateToProps = ({ tasks }, { params: { projectId } })=> ({
    projectId,
    isNew: true
});

const mapDispatchToProps = ( dispatch )=> ({
    onAdd( task ) { dispatch( addTask( task )) },
    onDelete( taskId ) { dispatch( deleteTask( taskId )) }
});

const TaskNew = connect( mapStateToProps, mapDispatchToProps )( Task );

export default TaskNew;
