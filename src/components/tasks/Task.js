import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/actions'

const mapStateToProps = ({ tasks }, { params: { taskId } })=> ({
    tasksCount: tasks.length,
    task: tasks.filter( task => task.id === parseInt( taskId, 10 ))[0]
});

const mapDispatchToProps = ( dispatch )=> ({
    onSave: task => dispatch( updateTask( task )),
    onDelete: taskId => dispatch( deleteTask( taskId ))
});

@connect( mapStateToProps, mapDispatchToProps )
class TaskModal extends Component {

    componentDidUpdate() {
        ReactDOM.findDOMNode(this.refs.title).focus();
    }

    render() {
        let { tasksCount, task, onDelete } = this.props;

        if ( tasksCount === 0 ) {
            return <div>no tasks</div>
        }

        return (<div className='modal'>
            <h1> { onDelete ? 'Edit' : 'New' } Task </h1>
            <label> Title: </label>
            <input ref='title' value={ task.title } onChange={ ()=> console.log(1)}/>
            <label> Text: </label>
            <textarea ref='text' value={ task.text } onChange={ ()=> console.log(2)}/>
            <p>
                <button onClick={ this.onSave }> Save </button>
                <Link to={`/${ task.projectId }`}> Cancel </Link>
                { onDelete ?
                    <button onClick={ this.onDelete } className='delete'> Delete </button> :
                    null
                }
            </p>
        </div>)
    }

    onSave = ()=> {
        let title = ReactDOM.findDOMNode( this.refs.title ),
            text = ReactDOM.findDOMNode( this.refs.text );

        this.props.onSave( Object.assign( {}, this.props.task, {
            title: title.value,
            text: text.value
        }));

        browserHistory.push(`/${ this.props.task.projectId}`);
    };

    onDelete = ()=> {
        this.props.onDelete( this.props.task.id );
        browserHistory.push(`/${ this.props.task.projectId}`);
    }
}

export default TaskModal;
