 

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as uiFlagsActions from './uiFlagsActions';

// prepare mock for Repository module
jest.mock('../Repository');
import repoInstance from '../Repository';

Enzyme.configure({ adapter: new Adapter() });

// mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockState = {
  uiFlags: {
  }
};
const store = mockStore(mockState);

describe('uiFlagsActions', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
    });

    it('check closeParametersEditedMessage action', () => {
        store.dispatch(uiFlagsActions.closeParametersEditedMessage());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check hideUpdateMessageBanner action', async () => {
        const sendShowParametersChangedMock = repoInstance.sendShowParametersChanged;
        sendShowParametersChangedMock.mockReturnValue(true);

        await store.dispatch(uiFlagsActions.hideUpdateMessageBanner(true));
        expect(sendShowParametersChangedMock).toHaveBeenCalledTimes(1);
        expect(store.getActions()).toMatchSnapshot();
    });

    it ('check fetchShowParametersChanged action', async () => {
        const loadShowParametersChangedMock = repoInstance.loadShowParametersChanged;
        await store.dispatch(uiFlagsActions.fetchShowParametersChanged(true));
        expect(loadShowParametersChangedMock).toHaveBeenCalledTimes(1);
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check rejectParametersEditedMessage action', () => {
        store.dispatch(uiFlagsActions.rejectParametersEditedMessage(true));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check showModalProgress action', () => {
        store.dispatch(uiFlagsActions.showModalProgress(true));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check showUpdateFailed action', () => {
        store.dispatch(uiFlagsActions.showUpdateFailed(true));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check showDownloadProgress action', () => {
        store.dispatch(uiFlagsActions.showDownloadProgress(true, "Some dialog title"));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check setRFALink action', () => {
        store.dispatch(uiFlagsActions.setDownloadLink("link"));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check showUploadPackage action', () => {
        store.dispatch(uiFlagsActions.showUploadPackage(true));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check editPackageFile action', () => {
        store.dispatch(uiFlagsActions.editPackageFile("file","assemblies"));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check editPackageRoot action', () => {
        store.dispatch(uiFlagsActions.editPackageRoot("root"));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check updateActiveTabIndex action', () => {
        store.dispatch(uiFlagsActions.updateActiveTabIndex(1));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check setProjectAlreadyExists action', () => {
        store.dispatch(uiFlagsActions.setProjectAlreadyExists(true));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check showDeleteProject action', () => {
        store.dispatch(uiFlagsActions.showDeleteProject(true));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check setCheckedProjects action', () => {
        store.dispatch(uiFlagsActions.setCheckedProjects(['1','2']));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('check clearCheckedProjects action', () => {
        store.dispatch(uiFlagsActions.clearCheckedProjects());
        expect(store.getActions()).toMatchSnapshot();
    });
});
