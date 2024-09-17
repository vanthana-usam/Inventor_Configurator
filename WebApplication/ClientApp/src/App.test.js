/**
 * @jest-environment ./src/test/custom-test-env.js
 */

 

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
  describe('App', () => {
    it('Test that app will not call adopt with parameters', () => {
        const fetchShowParametersChanged = jest.fn();
        const detectToken = jest.fn();
        const adoptProjectWithParameters = jest.fn();

        const props = {
          fetchShowParametersChanged,
          detectToken,
          adoptProjectWithParameters,
          embeddedModeEnabled: false
        };

        shallow(<App {...props}/>);
        expect(detectToken).toHaveBeenCalled();
        expect(fetchShowParametersChanged).toHaveBeenCalled();
        expect(adoptProjectWithParameters).not.toHaveBeenCalled();
    });

    it('Sets the embedded mode when specified url property', () => {
      const url = "someurl";
      const fetchShowParametersChanged = jest.fn();
      const detectToken = jest.fn();
      const adoptProjectWithParameters = jest.fn();

      const props = {
        fetchShowParametersChanged,
        detectToken,
        adoptProjectWithParameters,
        embeddedModeEnabled: true,
        embeddedModeUrl: url
      };

      shallow(<App {...props}/>);
      expect(fetchShowParametersChanged).not.toHaveBeenCalled();
      expect(adoptProjectWithParameters).toBeCalledWith(url);
    });
  });
});