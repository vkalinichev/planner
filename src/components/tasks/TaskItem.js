import { Link } from 'react-router';
import * as styles from './TaskItem.styl';
import CSSModules from 'react-css-modules';

const TaskItem = ({ projectId, active, task }) => (

    <div styleName='task-item'>
        <Link
            styleName={ `link ${ active ? 'active' : '' }` }
            to={ `/${ projectId }/${ task.id }` }
        >
            { task.title }
        </Link>
    </div>

);

export default CSSModules( TaskItem, styles, { allowMultiple: true } );
