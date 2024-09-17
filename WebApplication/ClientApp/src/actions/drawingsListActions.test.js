 

import { fetchDrawingsList } from './drawingsListActions';
import { actionTypes as uiFlagsActionTypes } from './uiFlagsActions';

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
const loadDrawingsListMock = repoInstance.loadDrawingsList;

const project = { id: 'project1', drawingsListUrl: 'url' };
const drawingsList = [ '1', '3' ];

describe('fetch Drawing List', () => {

    let store;

    beforeEach(() => {

        loadDrawingsListMock.mockClear();
        loadDrawingsListMock.mockResolvedValue(drawingsList);

        // prepare empty 'updated parameters' data
        const state = {};

        store = mockStore(state);
        store.getState = () => state;
    });

    describe('success', () => {
        it('gets and stores drawings list on fetch', async () => {

            await store.dispatch(fetchDrawingsList(project));
            expect(loadDrawingsListMock).toHaveBeenCalledTimes(1);
            expect(loadDrawingsListMock).toHaveBeenCalledWith(project.drawingsListUrl);

            // check expected store actions
            const actions = store.getActions();
            const updateAction = actions.find(a => a.type === uiFlagsActionTypes.DRAWING_LIST_UPDATED);
            expect(updateAction.drawingsList).toEqual(drawingsList);
        });
    });
});