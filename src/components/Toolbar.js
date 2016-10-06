import { showAddProject, filterTasks } from '../actions/actions';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const mapDispatchToProps = ( dispatch )=> ({
    showAddProject: ()=> dispatch( showAddProject() ),
    onFilter: ( query )=> {
        console.log("onFilter", query);
        dispatch( filterTasks( query ) )
    }
});

function Toolbar ({ projectId, showAddProject, onFilter }) {
    let projectTools = projectId ? (<div>
        <Link className='btn' to={`/${ projectId }/new`}> + New Task </Link>
        <input
            type="search"
            className="search"
            placeholder="Search Project..."
            onChange={ e => onFilter( e.target.value ) }
        />
    </div>) : null;

    return (<div className="toolbar">
        <div>
            <button onClick={ showAddProject }> + New Project </button>
        </div>
        { projectTools }
    </div>)
}

export default connect( null, mapDispatchToProps )( Toolbar )
