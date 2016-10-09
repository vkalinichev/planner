import { Link } from 'react-router';
import styles from './Project.styl';

function Project ({ project, active, deleteProject }) {
    const className = `${ styles.link } ${ active ? styles.active : '' }`;

    return <div className={ styles.project }>
        <Link to={ '/' + project.id } className={ className }>
            { project.name }
        </Link>
        <button className={ styles['delete-btn'] } onClick={ deleteProject }>⨯</button>
    </div>
}

export default Project
