import { Link } from 'react-router';
import { connect } from 'react-redux';

import Button from '../button/Button';
import { showAddProject, filterTasks } from '../../actions/actions';
import styles from './Toolbar.styl';

const mapDispatchToProps = ( dispatch )=> ({
    showAddProject: ()=> dispatch( showAddProject() ),
    onFilter: ( query )=> {
        dispatch( filterTasks( query ) )
    }
});

function Toolbar ({ projectId, showAddProject, onFilter }) {
    let projectTools = projectId ?
    <Button to={`/${ projectId }/new`}> + Task </Button>:
    null;

    return <div className={ styles.toolbar }>
        <Link className={ styles.logo } to='/'>Planner</Link>
        <input
            autoFocus
            type='search'
            className={ styles.search }
            placeholder='Search...'
            onChange={ e => onFilter( e.target.value ) }
        />
        <div className={ styles.tools }>
        <Button onClick={ showAddProject }> + Project </Button>
            { projectTools }
        </div>
    </div>
}

export default connect( null, mapDispatchToProps )( Toolbar )
