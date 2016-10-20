import { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import fuzzysearch from 'fuzzysearch';
import { Link } from 'react-router';
import { push as navigate } from 'react-router-redux';

import TaskItem from './TaskItem';
import TaskItemNew from './TaskItemNew';
import * as styles from './TasksList.styl';
import { addTask, deleteTask } from '../../actions/actions'

const matches = ( filter = "", task = "" )=> {
    const needle = filter.toLowerCase(),
        title = task.title.toLowerCase(),
        text = task.text.toLowerCase();
    return fuzzysearch(needle, title) || fuzzysearch(needle, text);
};

const mapStateToProps = ( { tasks, taskFilter }, { params: { projectId, taskId }} )=> ({
    projectId,
    activeTaskId: taskId,
    tasks: tasks.filter(c => c.projectId == projectId && matches( taskFilter, c ) )
});

const mapDispatchToProps = ( dispatch )=> ()=> ({
    addTask( task ) { dispatch( addTask( task )) },
    deleteTask( id ) { dispatch( deleteTask( id )) },
    navigate( url ) { dispatch( navigate( url )) }
});

@connect( mapStateToProps, mapDispatchToProps )
@cssModules( styles, { allowMultiple: true } )
class TasksList extends Component {

    componentDidUpdate() {
        let el = this.refs.add;
        if ( el ) {
            el.focus()
        }
    }

    render() {
        console.log(this.props.activeTaskId);
        const { tasks, children, projectId, activeTaskId } = this.props;

        return <div styleName='container'>
            <div styleName='list'>
                <TaskItemNew
                    projectId={ projectId }
                    active={ !activeTaskId }
                    hidden={ projectId === 'new' }
                    onAdd={ this.addTask }
                />
                { tasks && tasks.length ? tasks.map( task =>
                    <TaskItem
                        projectId={ projectId }
                        active={ task.id == activeTaskId }
                        task={ task }
                        key={ task.id }
                    />) :
                    <div styleName='stub'>
                        No tasks here yet.
                        <br/>
                        <Link to={`/${ projectId }/new`}>Create</Link>
                    </div>
                }
            </div>
            { children }
        </div>
    }

    addTask = ( task )=> {
        this.props.addTask( task );
    };
}

export default TasksList;
