import { Link } from 'react-router';
import * as styles from './TaskItem.styl';
import CSSModules from 'react-css-modules';

const TaskItemNew = ({ projectId, active, hidden })=> (

    <div styleName={ `task-item ${ hidden ? 'hidden' : '' }` }>
        <Link
            styleName={ `link link_new ${ active ? 'active' : '' }` }
            to={ `/${ projectId }/new` }
        >
            New
        </Link>
    </div>

);

export default CSSModules( TaskItemNew, styles, { allowMultiple: true } );
