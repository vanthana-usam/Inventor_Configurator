/**
 * @jest-environment ./src/test/custom-test-env.js
 */

 

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { TabsContainer } from './tabsContainer';

Enzyme.configure({ adapter: new Adapter() });

const updateActivetabIndexMock = jest.fn();

describe('tabsContainer', () => {
    it('handles tab change', () => {
        const wrapper = shallow(<TabsContainer updateActiveTabIndex = {updateActivetabIndexMock} />);
        const tabsWrapper = wrapper.find('Tabs');
        tabsWrapper.simulate('TabChange', 3);
        expect(updateActivetabIndexMock).toHaveBeenCalledWith(3);
    });
});