import { Link } from 'react-router';
import { goBack } from 'react-router-redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import * as styles from './Project.styl';

const mapDispatchToProps = ( dispatch )=> ({
    goBack: ()=> dispatch( goBack() )
});

@connect( null, mapDispatchToProps )
@cssModules( styles, { allowMultiple: true } )
class Project extends Component {

    handleKeyPress = ( event )=> {
        const value = event.target.value;

        if ( event.which === 13 && value ) {
            this.props.onAdd(value);
            this.props.goBack()
        }
    };

    handleKeyDown = ( event )=> {
        if ( event.which === 27 ) {
            this.props.goBack()
        }
    };

    render() {
        let input = <div styleName='new-input-wrapper' >
            <input
                styleName='new-input'
                autoFocus
                type='text'
                placeholder='project name'
                defaultValue=''
                onKeyPress={ this.handleKeyPress }
                onKeyDown={ this.handleKeyDown }
            />
        </div>;

        return <div styleName='project'>
            { this.props.active ?
                input:
                <Link to='/new' styleName='link link_new'>+ new</Link>
            }
        </div>
    }
}

export default Project;
