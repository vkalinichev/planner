import Sidebar from '../components/Sidebar'
import Toolbar from '../components/Toolbar'
import { connect } from 'react-redux';

const mapStateToProps = ( props, { params: { projectId } } ) => ({
    projectId
});

const App = ({ projectId, children }) => {
    return( <div className="app">
        <Toolbar projectId={ projectId }/>
        <Sidebar projectId={ projectId }/>
        { children }
    </div> )
};

export default connect(mapStateToProps)(App);
