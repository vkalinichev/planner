import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import fuzzysearch from 'fuzzysearch';

import Task from './Task';
import * as styles from './TasksList.styl';

const matches = ( filter = "", task = "" ) => {
    const needle = filter.toLowerCase(),
        title = task.title.toLowerCase(),
        text = task.text.toLowerCase();
    return fuzzysearch(needle, title) || fuzzysearch(needle, text);
};

const mapStateToProps = ( { tasks, taskFilter }, { params: { projectId }} ) => ({
    tasks: tasks.filter(c => c.projectId == projectId && matches( taskFilter, c ) )
});

function VisibleTasks ({ tasks, children }) {
    const tasksList = tasks && tasks.length ?
        tasks.map( task => <Task task={ task } key={ task.id }/> ):
        'No tasks here';

    return (<div styleName={ 'list ' + tasks.length ? '' : 'empty' } >
        { tasksList }
        { children }
    </div>);
}

export default connect( mapStateToProps )( CSSModules( VisibleTasks, styles, { allowMultiple: true } ) )
