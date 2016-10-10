import { Link } from 'react-router';
import * as styles from './Project.styl';
import CSSModules from 'react-css-modules';

const Project = ({ project, active, onClickDelete }) => (

    <div styleName='project' >

        <Link to={ '/' + project.id } styleName={ `link ${ active ? 'active' : '' }` } >
            { project.name }
        </Link>

        <button styleName='delete-btn' onClick={ onClickDelete }>⨯</button>

    </div>

);

export default CSSModules( Project, styles, { allowMultiple: true } )
