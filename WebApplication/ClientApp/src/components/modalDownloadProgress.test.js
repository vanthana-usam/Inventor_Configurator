 

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ModalDownloadProgress } from './modalDownloadProgress';

Enzyme.configure({ adapter: new Adapter() });

describe('modal progress', () => {

    it('should show message from props.label', () => {

        const props = {
            title: "modal progress dialog title",
            label: "name of file in progress",
            icon: "Archive.svg"
        };

        const wrapper = shallow(<ModalDownloadProgress {...props} />);

        const wrapperComponent = wrapper.find('.modalAction');
        const children = wrapperComponent.prop('children');

        expect(children).toHaveLength(2);
        expect(children[0].props['children']).toBe(props.label);
    });

    it('should show message that props.label is missing', () => {

        const propsNoTitle = { title: null };

        const wrapper = shallow(<ModalDownloadProgress {...propsNoTitle} />);

        const wrapperComponent = wrapper.find('.modalAction');
        const children = wrapperComponent.prop('children');

        expect(children).toHaveLength(2);
        expect(children[0].props['children']).toBe("Missing label.");
    });

    it('check Ok button when specified download url', () => {

        const props = { url: "someUrl" };

        const wrapper = shallow(<ModalDownloadProgress {...props} />);

        const button = wrapper.find('Button');
        expect(button.prop('title')).toBe('Ok');
    });

    it('check that here is NO button available when not used download url', () => {

        const props = { url: null };

        const wrapper = shallow(<ModalDownloadProgress {...props} />);

        const button = wrapper.find('Button');
        expect(button.length).toBe(0);
    });

    it('check that here is ONE button available', () => {

        const props = { url: "someurl" };

        const wrapper = shallow(<ModalDownloadProgress {...props} />);

        const buttons = wrapper.find('Button');
        expect(buttons.length).toBe(1);
    });

    it('should close when Ok button clicked', () => {
        const closeMockFn = jest.fn();
        const props = { onClose: closeMockFn, url: 'http://example.com' };

        const wrapper = shallow(<ModalDownloadProgress {...props} />);

        const closeButton = wrapper.find({ title: "Ok"});
        expect(closeButton.length).toEqual(1);

        closeButton.simulate('click');
        expect(closeMockFn).toHaveBeenCalledTimes(1);
    });

    it('should link to the rfa url in the props', () => {
        const props = { url: 'http://example.com' };

        const wrapper = shallow(<ModalDownloadProgress {...props} />);

        const hyperlink = wrapper.find('HyperLink');
        expect(hyperlink.prop('href')).toEqual(props.url);
    });
});
