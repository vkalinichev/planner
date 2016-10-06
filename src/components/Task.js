import { Link } from 'react-router';

function Task ({ task }) {
    return (<div className='task'>
        <div>
            <p> { task.title } </p>
            <Link className='btn' to={ `/${ task.projectId }/${ task.id }` }> Edit </Link>
        </div>
    </div>);
}

export default Task;
