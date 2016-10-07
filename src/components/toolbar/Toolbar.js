import { Link } from 'react-router';
import { connect } from 'react-redux';

import { showAddProject, filterTasks } from '../../actions/actions';
import styles from './Toolbar.styl';

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

    return <div className={ styles.toolbar }>
        <button onClick={ showAddProject }> + New Project </button>
        { projectTools }
    </div>
}

export default connect( null, mapDispatchToProps )( Toolbar )
