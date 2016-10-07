import Task from './Task';
import { connect } from 'react-redux';
import fuzzysearch from 'fuzzysearch';
import styles from './TasksList.styl';

const matches = ( filter = "", task = "" ) => {
    const needle = filter.toLowerCase(),
        title = task.title.toLowerCase(),
        text = task.text.toLowerCase();
    return fuzzysearch(needle, title) || fuzzysearch(needle, text);
};

const mapStateToProps = ( { tasks, taskFilter }, { params: { projectId }} ) => {
    return {
        tasks: tasks.filter(c => c.projectId == projectId && matches( taskFilter, c ) )
    }
};

function VisibleTasks ({ tasks, children }) {
    const tasksList = tasks && tasks.length ?
        tasks.map( task => <Task task={ task } key={ task.id }/> ):
        'No tasks here';

    return (<div className={ styles.list + (!tasks.length ? " " + styles.empty : "" ) }>
        { tasksList }
        { children }
    </div>);
}

export default connect( mapStateToProps )( VisibleTasks )
