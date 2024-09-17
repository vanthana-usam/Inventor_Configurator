 

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { UserDetails } from './userDetails';

Enzyme.configure({ adapter: new Adapter() });

describe('user dialog', () => {

    it('check there is contained a hyperlink to README.md', () => {

        const props = {
            profile: {
              name: 'profileName',
              avatarUrl: 'avatarUrl',
              isLoggedIn: true,
            }
          };

        const wrapper = shallow(<UserDetails {...props} />);

        const hyperlinkSpan = wrapper.find('.hyperlink');

        expect(hyperlinkSpan.length).toBe(1);
        expect(hyperlinkSpan.find('a').prop('href')).toContain('about.md');
    });

});