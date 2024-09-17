 

import { addError, addLog } from './notificationActions';
import { Jobs } from '../JobManager';
import { showAdoptWithParametersProgress, updateActiveTabIndex } from './uiFlagsActions';
import { updateActiveProject } from '../actions/projectListActions';
import { addProject } from './projectListActions';

export const adoptProjectWithParameters = (parameters) => async (dispatch) => {
    dispatch(addLog('adoptProjectWithParameters invoked'));

    const jobManager = Jobs();

    // launch progress dialog immediately before we started connection to the server
    dispatch(showAdoptWithParametersProgress(true));

    try {
        await jobManager.doAdoptWithParameters(parameters,
            // start job
            () => {
                dispatch(addLog('JobManager: HubConnection started for adopt project with params'));
            },
            // onComplete
            (project) => {
                dispatch(addLog('JobManager: Adopt project with paramscReceived onComplete'));

                // hide modal dialog
                dispatch(showAdoptWithParametersProgress(false));
                dispatch(addProject(project));
                dispatch(updateActiveProject(project.id));
                dispatch(updateActiveTabIndex(0));
            },
            // onError
            (errorData) => {
                if ('messages' in errorData) {
                    dispatch(addLog('JobManager: Adopt project with params Received onError: ' + errorData.messages[0]));
                }

                if ('reportUrl' in errorData) {
                    dispatch(addLog('JobManager: Adopt project with params Received onError, report URL: ' + errorData.reportUrl));
                }

                // hide progress modal dialog
                dispatch(showAdoptWithParametersProgress(false));
            }
        );
    } catch (error) {
        dispatch(addError('JobManager: Error : ' + error));
    }
};