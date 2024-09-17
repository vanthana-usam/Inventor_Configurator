 

import bomReducer, {initialState} from './bomReducer';
import {updateBom} from '../actions/bomActions';
import {getBom} from './mainReducer';

describe('BOM reducer', () => {
    const bomDataA = {
        columns: [ {label: "Part No"}, {label: "Desc"} ],
        data: [ [ "SM20", "M20 screw"], [ "BM20", "M20 bolt"] ]
    };
    const bomDataAnew = {
        columns: [ {label: "Part No"}, {label: "Desc"} ],
        data: [ [ "SM22", "M22 screw"], [ "BM22", "M22 bolt"] ]
    };
    const bomDataB = {
        columns: [ {label: "Part Number"}, {label: "Description"} ],
        data: [ [ "1101", "Crew cabin"], [ "7.11", "Ejector"] ]
    };
    const prefilledInitialState = {};
    prefilledInitialState['projectA'] = bomDataA;
    prefilledInitialState['projectB'] = bomDataB;

    test('should return the initial state', () => {
        expect(bomReducer(undefined, {})).toEqual(initialState);
    });

    test('handles updating the BOM', () => {
        const expectedState = {};
        expectedState['projectA'] = bomDataAnew;
        expectedState['projectB'] = bomDataB;

        expect(bomReducer(prefilledInitialState, updateBom('projectA', bomDataAnew))).toEqual(expectedState);
    });

    it('returns the correct data' ,() => {
        const mainState =  { bom: prefilledInitialState};
        expect(getBom('projectB', mainState)).toEqual(bomDataB);
    });
});