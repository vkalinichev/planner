import { Link } from 'react-router';
import styles from './Project.styl';

function Project ({ project, active }) {
    return <Link
        to={`/${ project.id }`}
        className={`${ styles.link } ${ active ? styles.active : '' }`}
    >
        { project.name }
    </Link>
}

export default Project
