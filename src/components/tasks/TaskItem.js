import { Link } from 'react-router';
import * as styles from './TaskItem.styl';
import CSSModules from 'react-css-modules';

const TaskItem = ({ task, active })=> {
    let styleName = 'link',
        to = `/${ task.projectId }/`,
        title;

    if ( active ) styleName += ' active';

    if ( task.id === 'new' ) {
        styleName += ' new';
        if ( task.projectId === 'new' ) {
            styleName += ' hidden'
        }
        to += 'new';
        title = 'New'
    } else {
        to += task.id;
        title = task.title;
    }

    return <div styleName='task-item'>
        <Link styleName={ styleName } to={ to } >{ title }</Link>
    </div>
};

export default CSSModules( TaskItem, styles, { allowMultiple: true } );
