import { Component } from 'react';
import cssModules from 'react-css-modules';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Button from '../button/Button';
import { addTask, updateTask, deleteTask } from '../../actions/actions'
import * as styles from './Task.styl';

const mapStateToProps = ({ tasks }, { params: { taskId } })=> ({
    isNew: taskId === 'new',
    tasksCount: tasks.length,
    task: tasks.filter( task => task.id === parseInt( taskId, 10 ))[0]
});

const mapDispatchToProps = ( dispatch )=> ({
    onAdd: task => dispatch( addTask( task )),
    onSave: task => dispatch( updateTask( task )),
    onDelete: taskId => dispatch( deleteTask( taskId ))
});

@connect( mapStateToProps, mapDispatchToProps )
@cssModules( styles, { allowMultiple: true } )

class TaskModal extends Component {

    componentDidUpdate() {
        this.refs.title.focus();
    }

    render() {
        let { isNew, tasksCount, task } = this.props;

        if ( tasksCount === 0 ) {
            return <div>no tasks</div>
        }

        if ( task )

        return (<div styleName='task'>
            <div styleName='title'> { isNew ? 'New' : 'Edit' } Task </div>
            <div styleName='line'>
                <label> Title: </label>
                <input ref='title' value={ task.title } onChange={ ()=> console.log(1)}/>
            </div>
            <div styleName='line'>
                <label> Text: </label>
                <textarea ref='text' value={ task.text } onChange={ ()=> console.log(2)}/>
            </div>
            <div styleName='buttons'>
                { isNew ?
                    <Button onClick={ this.onAdd }> Add </Button> :
                    <Button onClick={ this.onSave }> Save </Button>
                }
                <Button to={`/${ task.projectId }`}> Cancel </Button>
                { isNew ?
                    null:
                    <Button onClick={ this.onDelete } className='delete'> Delete </Button>
                }
            </div>
        </div>)
    }

    onAdd = ()=> {
        this.props.onAdd( {
            id: +new Date,
            title: this.refs.title.value,
            text: this.refs.text.value
        });

        browserHistory.push(`/${ this.props.task.projectId}`);
    };

    onSave = ()=> {
        this.props.onSave( Object.assign( {}, this.props.task, {
            title: this.refs.title.value,
            text: this.refs.text.value
        }));

        browserHistory.push(`/${ this.props.task.projectId}`);
    };

    onDelete = ()=> {
        this.props.onDelete( this.props.task.id );
        browserHistory.push(`/${ this.props.task.projectId}`);
    }
}

export default TaskModal;
