import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/actions'
import TaskModal from './TaskModal'

const mapStateToProps = ({ tasks }, { params: { taskId } })=> ({
    task: tasks.filter( task => task.id === parseInt( taskId, 10 ) )[0]
});

const mapDispatchToProps = ( dispatch )=> ({
    onSave: task => dispatch( updateTask( task )),
    onDelete: taskId => dispatch( deleteTask( taskId ))
});

export default connect( mapStateToProps, mapDispatchToProps )( TaskModal );
