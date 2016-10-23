import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { push as navigate } from 'react-router-redux';

import * as styles from './ProjectsList.styl';

import Project from './Project';
import ProjectNew from './ProjectNew';
import { addProject, deleteProject } from '../../actions/actions'

@connect( ({ projects })=> ({
    projects
}), {
    addProject,
    deleteProject,
    navigate
})
@cssModules( styles, { allowMultiple: true } )
class ProjectsList extends React.Component {

    componentDidUpdate() {
        let el = this.refs.add;
        if ( el ) {
            el.focus()
        }
    }

    render() {
        const { projects, projectId, deleteProject } = this.props;

        return <div styleName='list' >
            <ProjectNew
                active={ projectId === 'new' }
                onAdd={ this.addProject}
            />
            { projects.map( (project, i)=>
                <Project
                    project={ project }
                    key={ project.id }
                    active={ project.id == projectId }
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
