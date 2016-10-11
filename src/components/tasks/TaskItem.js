import { Link } from 'react-router';
import * as styles from './TaskItem.styl';
import CSSModules from 'react-css-modules';

const TaskItem = ({ task, isActive })=> (
    <div styleName='task-item'>
        <Link
            styleName={`link ${ isActive ? 'active' : '' }`}
            to={ `/${ task.projectId }/${ task.id }` }
        >
            { task.title }
        </Link>
    </div>
);

export default CSSModules( TaskItem, styles, { allowMultiple: true } );
