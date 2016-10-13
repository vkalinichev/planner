import React from 'react';
import ReactDOM from 'react-dom';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { push as navigate } from 'react-router-redux';

import * as styles from './ProjectsList.styl';

import Project from './Project';
import ProjectNew from './ProjectNew';
import { addProject, deleteProject } from '../../actions/actions'

const mapStateToProps = ({ projects }) => ({
    projects
});

const mapDispatchToProps = dispatch => ({ projects }) => ({
    addProject: name => dispatch( addProject( name ) ),
    deleteProject: id => dispatch( deleteProject( id ) ),
    navigate: url => dispatch( navigate( url ) )
});

@connect( mapStateToProps, mapDispatchToProps )
@cssModules( styles, { allowMultiple: true } )
class ProjectsList extends React.Component {

    componentDidUpdate() {
        let el = this.refs.add;
        if ( el ) {
            el.focus()
        }
    }

    render() {
        let { projects, projectId, deleteProject } = this.props;

        return <div className={ styles.list } >
            <ProjectNew
                active={ projectId === 'new' }
                onAdd={ this.addProject}
            />
            { projects.map( (project, i)=>
                <Project
                    project={ project }
                    key={ i }
                    active={ projectId == project.id }
                    onClickDelete={ ()=> deleteProject( project.id ) }
                />
            ) }
        </div>
    }

    addProject = ( name )=> {
        this.props.addProject( name );
    }
}

export default ProjectsList;
