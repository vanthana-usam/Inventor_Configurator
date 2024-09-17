 

import repo from '../Repository';
import {addError, addLog} from './notificationActions';
import {updateDrawingsList} from './uiFlagsActions';

export const fetchDrawingsList = (project) => async (dispatch) => {
    if(!project.id) return;

    dispatch(addLog('Load Drawings list invoked'));
    try {
        const data = await repo.loadDrawingsList(project.drawingsListUrl);
        dispatch(addLog('Drawings list received'));
        dispatch(updateDrawingsList(data));
    } catch (error) {
        dispatch(addError('Failed to get Drawings list for ' + project.id + '. (' + error + ')'));
    }
};
