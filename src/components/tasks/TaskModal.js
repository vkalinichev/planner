import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class TaskModal extends Component {

    componentDidUpdate() {
        ReactDOM.findDOMNode(this.refs.title).focus();
    }

    render() {
        let { task, onDelete } = this.props;

        return (<div className='modal'>
            <h1> { onDelete ? 'Edit' : 'New' } Task </h1>
            <label> Title: </label>
            <input ref='title' defaultValue={ task.title }/>
            <label> Text: </label>
            <textarea ref='text' defaultValue={ task.text }/>
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
        let title = ReactDOM.findDOMNode(this.refs.title),
            text = ReactDOM.findDOMNode(this.refs.text);

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
