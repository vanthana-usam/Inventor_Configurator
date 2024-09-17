 

import bomActionTypes from "../actions/bomActions";

export const initialState = {};

export const getBom = function(projectId, state) {
    return state[projectId];
};

export default function(state = initialState, action) {

    switch(action.type) {
        case bomActionTypes.BOM_UPDATED: {
            const newState = { ...state };
            newState[action.projectId] = action.bomData;
            return newState;
        }
        default:
            return state;
    }
}
