import * as actions from './actions';

describe( 'actions', () => {

    it('should create an action to update a task', () => {
        const task = {
            title: "new title",
            text: "new text"
        };
        const expectedAction = {
            type: "UPDATE_TASK",
            data: task
        };
        expect( actions.updateTask( task ) ).toEqual( expectedAction )
    });

    it('should create an action to delete a task', () => {
        const taskId = 17;
        const expectedAction = {
            type: "DELETE_TASK",
            data: taskId
        };
        expect( actions.deleteTask( taskId ) ).toEqual( expectedAction )
    })
});
