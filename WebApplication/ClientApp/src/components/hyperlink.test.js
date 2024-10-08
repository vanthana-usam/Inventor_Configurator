 

import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import HyperLink from './hyperlink';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
  describe('hyperlink', () => {
    it('verify that when clicked link, called passed function(used for close modal UI)', () => {
        const onUrlClickMock = jest.fn();
        const props = {
          href: "",
          prefix: "P ",
          link: "link",
          suffix: " S",
          onUrlClick: onUrlClickMock
        };

        const wrapper = mount(<HyperLink {...props}/>);
        const href = wrapper.find('a');
        href.simulate('click');
        expect(onUrlClickMock).toHaveBeenCalledTimes(1);
      });
    it('verify that is automatically started download of specified link', () => {
        const onAutostartMock = jest.fn();
        const props = {
          href: "link to file",
          prefix: "P ",
          link: "link text",
          suffix: " S",
          onAutostart: onAutostartMock
        };

        mount(<HyperLink {...props}/>);
        expect(onAutostartMock).toHaveBeenCalledTimes(1);
      });
    it('verify that link has download attribute when defined in props', () => {
      const props = {
        href: "link to file",
        prefix: "P ",
        link: "link text",
        suffix: " S",
        download: true
      };

      const wrapper = shallow(<HyperLink {...props}/>);

      const link = wrapper.find('a');
      expect(link.prop('download')).toBeDefined();
    });
    it('verify that link has NO download attribute when not defined in props', () => {
      const props = {
        href: "link to file",
        prefix: "P ",
        link: "link text",
        suffix: " S"
      };

      const wrapper = shallow(<HyperLink {...props}/>);

      const link = wrapper.find('a');
      expect(link.prop('download')).toBeUndefined();
    });
  });
});
