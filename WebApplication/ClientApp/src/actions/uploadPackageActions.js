 

import repo from '../Repository';
import { uploadPackageData } from '../reducers/mainReducer';
import { addProject } from './projectListActions';
import { setProjectAlreadyExists, showUploadPackage, setStats, setReportUrl } from './uiFlagsActions';
import { addError, addLog } from './notificationActions';
import { Jobs } from '../JobManager';
import { resetParameters } from "./parametersActions";

const actionTypes = {
    SET_UPLOAD_PROGRESS_VISIBLE: 'SET_UPLOAD_PROGRESS_VISIBLE',
    SET_UPLOAD_PROGRESS_HIDDEN: 'SET_UPLOAD_PROGRESS_HIDDEN',
    SET_UPLOAD_PROGRESS_DONE: 'SET_UPLOAD_PROGRESS_DONE',
    SET_UPLOAD_FAILED: 'SET_UPLOAD_FAILED',
    HIDE_UPLOAD_FAILED: 'HIDE_UPLOAD_FAILED'
};

export default actionTypes;

export const uploadPackage = () => async (dispatch, getState) => {
    const packageData = uploadPackageData(getState());

    if (packageData.file !== null && (packageData.root.length > 0 || packageData.file?.name.endsWith('.zip') === false)) {
        dispatch(showUploadPackage(false));
        dispatch(setUploadProgressVisible());

        let uploadResponse = null;

        try {
            uploadResponse = await repo.uploadPackage(packageData);
        } catch (e) {
            dispatch(setUploadProgressHidden());

            const httpStatus = e.response.status;
            if (httpStatus === 409) {
                dispatch(setProjectAlreadyExists(true));
            } else {
                dispatch(setUploadFailed(`Upload failed with ${httpStatus} error`));
            }

            return;
        }

        const jobManager = Jobs();
        try {
            await jobManager.doAdoptJob(uploadResponse,
                // start job
                () => {
                    dispatch(addLog('JobManager: HubConnection started for adopt project : ' + uploadResponse));
                },
                // onComplete
                (newProject, stats, reportUrl) => {
                    dispatch(addLog('JobManager: Received onComplete'));
                    dispatch(resetParameters(newProject.id, null));
                    dispatch(addProject(newProject));
                    dispatch(setStats(stats));
                    dispatch(setReportUrl(reportUrl));
                    dispatch(setUploadProgressDone());
                },
                // onError
                (errorData) => {
                    dispatch(addLog('JobManager: Received onError with jobId: ' + errorData.jobId));
                    dispatch(setUploadProgressHidden());
                    // show error modal dialog
                    dispatch(setUploadFailed(errorData));
                }
            );
        } catch (error) {
            dispatch(addError('JobManager: Error : ' + error));
        }
    }
};

export const setUploadProgressVisible = () => {
    return {
        type: actionTypes.SET_UPLOAD_PROGRESS_VISIBLE
    };
};

export const setUploadProgressHidden = () => {
    return {
        type: actionTypes.SET_UPLOAD_PROGRESS_HIDDEN
    };
};

export const setUploadProgressDone = () => {
    return {
        type: actionTypes.SET_UPLOAD_PROGRESS_DONE
    };
};

export const setUploadFailed = (errorData) => {
    return {
        type: actionTypes.SET_UPLOAD_FAILED,
        errorData: errorData
    };
};

export const hideUploadFailed = () => {
    return {
        type: actionTypes.HIDE_UPLOAD_FAILED
    };
};
