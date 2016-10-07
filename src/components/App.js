import Sidebar from './ProjectsList'
import Toolbar from '../components/Toolbar'
import { connect } from 'react-redux';
import styles from './App.styl';

const mapStateToProps = ( props, { params: { projectId } } ) => ({
    projectId
});

const App = ({ projectId, children }) => {
    return( <div className={ styles.container }>

        <Toolbar projectId={ projectId }/>
        <div className={ styles.main }>
            <Sidebar projectId={ projectId }/>
            { children }
        </div>
    </div> )
};

export default connect(mapStateToProps)(App);
