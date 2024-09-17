 

import actionTypes, { fetchBom } from './bomActions';

// the test based on https://redux.js.org/recipes/writing-tests#async-action-creators

// prepare mock for Repository module
jest.mock('../Repository');
import repoInstance from '../Repository';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// set expected value for the mock
const loadBomMock = repoInstance.loadBom;
const newBOM = {
    columns: [ {label: "Part No"}, {label: "Desc"} ],
    data: [ [ "SM22", "M22 screw"], [ "BM22", "M22 bolt"] ]
};

describe('load BOM', () => {

    let store;

    beforeEach(() => {

        loadBomMock.mockClear();
        loadBomMock.mockResolvedValue(newBOM);

        // prepare empty 'updated parameters' data
        const state = {};

        store = mockStore(state);
        store.getState = () => state;
    });

    it('updates the bom state after fetch BOM', async () => {
        const project = { id: 'projectA', bomJsonUrl: 'bomUrl'};
        await store.dispatch(fetchBom(project));
        expect(loadBomMock).toBeCalledWith('bomUrl');

        // check expected store actions
        const actions = store.getActions();
        const updateAction = actions.find(a => a.type === actionTypes.BOM_UPDATED);
        expect(updateAction.projectId).toEqual(project.id);
        expect(updateAction.bomData).toEqual(newBOM);
    });
});