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
    })
});
