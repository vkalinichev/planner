import * as reducers from './index';

describe( 'tasks reducer', () => {

    it('should return the initial state', () => {
        expect(
            reducers.tasks(undefined, {})
        ).toEqual([])
    });

    it('should handle ADD_TASK', () => {
        const task0 = {
            id: 0,
            title: 'Use Redux',
            text: 'subj'
        };
        const task1 = {
            id: 1,
            title: 'Run the tests',
            text: 'subj'
        };
        const action = {
            type: 'ADD_TASK',
            data: task1
        };
        expect( reducers.tasks([], action ) ).toEqual( [ task1 ] );

        expect( reducers.tasks([ task0 ], action ) ).toEqual( [ task0, task1 ] );
    })

});
