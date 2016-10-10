import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styles from './ProjectsList.styl';

import Project from './Project';
import { addProject, deleteProject, showAddProject, hideAddProject } from '../../actions/actions'

const mapStateToProps = ({ projects, addingProject }) => ({
    projects,
    addingProject
});

const mapDispatchToProps = dispatch => ({ projects, addingProject }) => ({
    addProject: name => dispatch( addProject( name ) ),
    deleteProject: id => dispatch( deleteProject( id ) ),
    showAddProject: ()=> dispatch( showAddProject() ),
    hideAddProject: ()=> dispatch( hideAddProject() )
});

@connect( mapStateToProps, mapDispatchToProps )
class ProjectsList extends React.Component {

    componentDidUpdate() {
        let el = ReactDOM.findDOMNode( this.refs.add );
        if ( el ) {
            el.focus()
        }
    }

    render() {
        let props = this.props;

        return <div className={ styles.list } >

            { props.projects.map( (project, i)=>
                <Project
                    project={ project }
                    key={ i }
                    active={ props.projectId == project.id }
                    onClickDelete={ ()=> this.props.deleteProject( project.id ) }
                />
            ) }

            { props.addingProject && <input ref="add" onKeyPress={ this.createProject }/> }
        </div>
    }

    createProject = ( event )=> {
        if ( event.which !== 13 ) { return }

        var name = ReactDOM.findDOMNode( this.refs.add ).value;
        this.props.addProject( name );
        this.props.hideAddProject();
    }
}

export default ProjectsList;
