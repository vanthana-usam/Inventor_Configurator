 

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ReportUrl } from './reportUrl';

Enzyme.configure({ adapter: new Adapter() });

describe('Show report url', () => {
    it('Shows report url when work item finishes', () => {
        const props = { reportUrl: 'http://example.com' };
        const wrapper = shallow(<ReportUrl {...props} />);
        const hyperlink = wrapper.find('HyperLink');
        expect(hyperlink.prop('href')).toEqual(props.reportUrl);
        expect(wrapper).toEqual({});
    });

    it('Do not show report url', () => {
        const props = { reportUrl: null };
        const wrapper = shallow(<ReportUrl {...props} />);
        const hyperlink = wrapper.find('HyperLink');
        expect(hyperlink.contains('HyperLink')).toBe(false);
    });
});