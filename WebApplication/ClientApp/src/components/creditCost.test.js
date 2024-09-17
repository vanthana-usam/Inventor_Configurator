 

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CreditCost } from './creditCost';

Enzyme.configure({ adapter: new Adapter() });

describe('Show processing stats and cost', () => {
    it('Shows the cost  and time when run FDA was invoked', () => {
        const stats = { credits: 11, processing: 2 };
        const wrapper = shallow(<CreditCost stats={stats} />);
        const texts = wrapper.find('Typography');
        expect(texts.someWhere((t) => t.html().includes('Consumed resources'))).toBeTruthy();
        expect(wrapper.instance().props.stats).toEqual(stats);
    });

    it('Shows the last cost when cached result was used', () => {
        const stats = { credits: 3 };
        const wrapper = shallow(<CreditCost stats={stats} />);
        const texts = wrapper.find('Typography');
        expect(texts.someWhere((t) => t.html().includes('Used cache'))).toBeTruthy();
        expect(wrapper.instance().props.stats).toEqual(stats);
    });
});