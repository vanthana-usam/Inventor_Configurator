 

import repo from '../Repository';
import { addError, addLog } from './notificationActions';

const actionTypes = {
    BOM_UPDATED: 'BOM_UPDATED'
};

export default actionTypes;

export const updateBom = (projectId, bomData) => {
    return {
        type: actionTypes.BOM_UPDATED,
        projectId,
        bomData
    };
};

export const fetchBom = (project) => async (dispatch) => {
    if (! project.id) return;

    dispatch(addLog('get bom invoked'));
    try {
        const bomData = await repo.loadBom(project.bomJsonUrl);
        dispatch(addLog('bom received'));
        dispatch(updateBom(project.id, bomData));
    } catch (error) {
        dispatch(addError('Failed to get bom for ' + project.id + '. (' + error + ')'));
    }
};
