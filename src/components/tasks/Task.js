import { Component } from 'react';
import cssModules from 'react-css-modules';
import { browserHistory } from 'react-router';

import Button from '../button/Button';
import * as styles from './Task.styl';


@cssModules( styles, { allowMultiple: true } )

class Task extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            text: ''
        }
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({
            title: nextProps.task.title,
            text: nextProps.task.text
        })
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return !this.props.task ||
            !nextProps.task ||
            ( nextProps.task.id !== this.props.task.id ) ||
            nextState.title !== this.state.title ||
            nextState.text !== this.state.text;
    }

    render() {

        let { isNew, task, projectId } = this.props;

        if ( isNew ) task = { title: '', text: '' };

        if (!task) return null;

        return (<div styleName='task'>
            <div styleName='title'> { isNew ? 'New' : 'Edit' } Task </div>
            <div styleName='line'>
                <label> Title: </label>
                <input name='title' value={ this.state.title } onChange={ this.onChange }/>
            </div>
            <div styleName='line'>
                <label> Text: </label>
                <textarea name='text' value={ this.state.text } onChange={ this.onChange }/>
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

    onChange = ( event )=> {
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
