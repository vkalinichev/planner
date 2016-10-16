import { Link } from 'react-router';
import * as styles from './TaskItem.styl';
import CSSModules from 'react-css-modules';

const TaskItem = ({ task, active })=> {
    let styleName = 'link';
    if ( active ) styleName += ' active';
    if ( task.id === 'new' ) {
        styleName += ' new';
        if ( task.projectId === 'new' ) {
            styleName += ' hidden'
        }
    }

    return <div styleName='task-item'>
        { task.id === 'new' ?
            <Link
                styleName={ styleName }
                to={ `/${ task.projectId }/new` }
            >New</Link> :
            <Link
                styleName={ styleName }
                to={ `/${ task.projectId }/${ task.id }` }
            >{ task.title }</Link>
        }
    </div>
};

export default CSSModules( TaskItem, styles, { allowMultiple: true } );
