import { Link } from 'react-router';
import * as styles from './TaskItem.styl';
import CSSModules from 'react-css-modules';

const TaskItem = ({ task })=> (
    <Link
        styleName='task-item'
        to={ `/${ task.projectId }/${ task.id }` }
    >
        { task.title }
    </Link>
);

export default CSSModules( TaskItem, styles, { allowMultiple: true } );
