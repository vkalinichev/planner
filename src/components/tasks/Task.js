import { Component } from 'react';
import cssModules from 'react-css-modules';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Button from '../button/Button';
import { addTask, updateTask, deleteTask } from '../../actions/actions'
import * as styles from './Task.styl';

const mapStateToProps = ({ tasks }, { params: { projectId, taskId } })=> ({
        projectId,
        isNew: taskId === 'new',
        task: tasks.filter( task => task.id === parseInt( taskId, 10 ))[0]
});

const mapDispatchToProps = ( dispatch )=> ({
    onAdd: task => dispatch( addTask( task )),
    onSave: task => dispatch( updateTask( task )),
    onDelete: taskId => dispatch( deleteTask( taskId ))
});

@connect( mapStateToProps, mapDispatchToProps )
@cssModules( styles, { allowMultiple: true } )

class Task extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            text: ''
        };
    }

    componentWillReceiveProps ( nextProps ) {
        if ( nextProps.isNew && !this.props.isNew ) {
            this.setState( {
                title: '',
                text: ''
            } )
        } else if (nextProps.task)
            this.setState( {
                title: nextProps.task.title,
                text: nextProps.task.text
            } )
    }

    componentWillMount() {
        if (this.props.task)
            this.setState( {
                title: this.props.task.title,
                text: this.props.task.text
            } )
    }

    componentDidUpdate() {
        const title = this.refs.title;
        if (title) this.refs.title.focus();
    }

    render() {

        let { isNew, task, projectId } = this.props;

        if ( isNew ) task = { title: '', text: '' };

        if (!task) return null;

        return (<div styleName='task'>
            <div styleName='title'> { isNew ? 'New' : 'Edit' } Task </div>
            <div styleName='line'>
                <label> Title: </label>
                <input name='title' value={ this.state.title } onInput={ this.onInput } />
            </div>
            <div styleName='line'>
                <label> Text: </label>
                <textarea name='text' value={ this.state.text } onInput={ this.onInput } />
            </div>
            <div styleName='buttons'>
                { isNew ?
                    <Button onClick={ this.onAdd }> Add </Button> :
                    <Button onClick={ this.onSave }> Save </Button>
                }
                <Button to={`/${ projectId }`}> Cancel </Button>
                { isNew ?
                    null:
                    <Button onClick={ this.onDelete } className='delete'> Delete </Button>
                }
            </div>
        </div>)
    }

    onInput = ( event )=> {
        let state = {};
        state[ event.target.name ] = event.target.value;
        this.setState( state );
    };

    onAdd = ()=> {
        this.props.onAdd( {
            projectId: this.props.projectId,
            title: this.state.title,
            text: this.state.text
        });
    };

    onSave = ()=> {
        this.props.onSave( Object.assign( {}, this.props.task, {
            title: this.state.title,
            text: this.state.text
        }));
    };

    onDelete = ()=> {
        this.props.onDelete( this.props.task.id );
        browserHistory.push(`/${ this.props.projectId}`);
    }
}

export default Task;
