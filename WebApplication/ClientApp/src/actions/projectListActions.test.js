 

import { fetchProjects } from './projectListActions';

// the test based on https://redux.js.org/recipes/writing-tests#async-action-creators

// prepare mock for Repository module
jest.mock('../Repository');
import repoInstance from '../Repository';
const loadProjectsMock = repoInstance.loadProjects;

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testProjects = [
    {
        id: '1',
        label: 'Local Project 1',
        image: 'bike.png'
    },
    {
        id: '2',
        label: 'Another Local One',
        image: 'logo.png'
    }
];

describe('fetchProjects', () => {

    beforeEach(() => {
        loadProjectsMock.mockClear();
    });

    it('should fetch project from the server', async () => {

        // set expected value for the mock
        loadProjectsMock.mockReturnValue(testProjects);

        const store = mockStore({ /* initial state */ });

        await store.dispatch(fetchProjects()); // demand projects loading
        // ensure that the mock called once
        expect(loadProjectsMock).toHaveBeenCalledTimes(1);

        const actions = store.getActions();

        // check expected actions and their types
        expect(actions).toHaveLength(3);
        expect(actions.map(a => a.type)).toEqual(['ADD_LOG', 'ADD_LOG', 'PROJECT_LIST_UPDATED']);

        // check if the expected projects are returned
        expect(actions[2].projectList).toEqual(testProjects);
    });
});
