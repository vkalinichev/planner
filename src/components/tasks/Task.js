import { Link } from 'react-router';

const Task = ({ task })=> (
    <div className='task'>
        <p> { task.title } </p>
        <Link to={ `/${ task.projectId }/${ task.id }` }> Edit </Link>
    </div>
);

export default Task;
