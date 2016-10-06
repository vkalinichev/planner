import TaskModal from './TaskModal';
import { connect } from 'react-redux';
import { addTask } from '../actions/actions';

const mapStateToProps = ( props, { params: { projectId } } )=>({
    task: { projectId }
});

const mapDispatchToProps = ( dispatch )=> ({
    onSave: task => dispatch( addTask( task ))
});

export default connect( mapStateToProps, mapDispatchToProps )( TaskModal )
