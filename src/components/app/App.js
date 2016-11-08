import { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import Sidebar from '../projects/ProjectsList'
import Toolbar from '../toolbar/Toolbar'
import * as styles from './App.styl';
import { authorize } from '../../actions/actions'

const mapStateToProps = ( { auth }, { params: { projectId } } ) => ({
    auth,
    projectId
});

class App extends Component {

    componentDidMount() {
        this.props.authorize()
    }

    render() {

        const { auth, projectId, children } = this.props

        if ( !auth.isAuthorized ) return <div>Unauthorized</div>
        if ( auth.isAuthorized ) return <div>Authorized</div>

        return (
            <div styleName='container'>
                <Toolbar projectId={ projectId }/>
                <div styleName='main'>
                    <Sidebar projectId={ projectId }/>
                    { children }
                </div>
            </div>
        )
    }
}

export default connect( mapStateToProps, { authorize } )( CSSModules( App, styles ) );
