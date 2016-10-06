import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addProject, showAddProject, hideAddProject } from '../actions/actions'
import { Link } from 'react-router';

const mapStateToProps = ({ projects, addingProject }) => ({
    projects,
    addingProject
});

const mapDispatchToProps = dispatch => ({ projects, addingProject }) => ({
    addProject: name => dispatch( addProject(name) ),
    showAddProject: ()=> dispatch( showAddProject() ),
    hideAddProject: ()=> dispatch( hideAddProject() )
});

@connect( mapStateToProps, mapDispatchToProps )
class Sidebar extends React.Component {

    componentDidUpdate() {
        let el = ReactDOM.findDOMNode( this.refs.add );
        if ( el ) {
            el.focus()
        }
    }

    render() {
        let props = this.props;

        return <div className="sidebar">
            <h2>All projects</h2>

            <ul>
                { props.projects.map( (project, i)=>
                    <li key={ i } className={props.projectId == project.id ? "selected" : ""} >
                        <Link to={`/${ project.id }`} > { project.name } </Link>
                    </li>
                ) }
            </ul>
            { props.addingProject && <input ref="add" onKeyPress={ (e)=> this.createProject(e) }/> }
        </div>
    }

    createProject( event ) {
        if ( event.which !== 13 ) { return }

        var name = ReactDOM.findDOMNode( this.refs.add ).value;
        this.props.addProject( name );
        this.props.hideAddProject();
    }
}

export default Sidebar;
