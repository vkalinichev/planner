import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import Sidebar from '../projects/ProjectsList'
import Toolbar from '../toolbar/Toolbar'
import * as styles from './App.styl';

const mapStateToProps = ( props, { params: { projectId } } ) => ({
    projectId
});

const App = ({ projectId, children }) => (
    <div styleName='container' >
        <Toolbar projectId={ projectId }/>
        <div styleName='main' >
            <Sidebar projectId={ projectId }/>
            { children }
        </div>
    </div>
);

export default connect( mapStateToProps )( CSSModules( App, styles ) );
