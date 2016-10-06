import Task from './Task';
import { connect } from 'react-redux';
import fuzzysearch from 'fuzzysearch';

const matches = ( filter, task ) =>
  fuzzysearch( filter, task.title ) || fuzzysearch( filter, task.back );

const mapStateToProps = ( { tasks, taskFilter }, { params: { projectId }} ) => {
    return {
        tasks: tasks.filter(c => c.projectId == projectId && matches( taskFilter, c ) )
    }
};

function VisibleTasks ({ tasks, children }) {
    return (<div className='main'>
        { tasks.map( task => <Task task={ task } key={ task.id }/> )}
        { children }
    </div>);
}

export default connect( mapStateToProps )( VisibleTasks )
