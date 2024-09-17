 

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Drawing} from './drawing';

Enzyme.configure({ adapter: new Adapter() });

describe('Drawings', () => {
  it('Page has expected text when no drawings available', () => {
      const props = {
        activeProject: { id: "1" },
        drawingPdf: ""
      };

      const wrapper = shallow(<Drawing {...props}/>);
      const wrapperComponent = wrapper.find('.drawingEmptyText');
      expect(wrapperComponent.length).toEqual(1);
      const children = wrapperComponent.prop('children');
      expect(children).toEqual("You don't have any drawings in your package.");
    });

  it('Page has expected text when package is not assembly', () => {
      const props = {
        activeProject: { id: "1", isAssembly: false }
      };

      const wrapper = shallow(<Drawing {...props}/>);
      const wrapperComponent = wrapper.find('.drawingEmptyText');
      expect(wrapperComponent.length).toEqual(1);
      const children = wrapperComponent.prop('children');
      expect(children).toEqual("You don't have any drawings in your package.");
    });

  it('check that fetching of drawing is called when package is assembly', () => {
      const fetchDrawingMock = jest.fn();
      const props = {
        activeProject: { id: "1", isAssembly: true, hasDrawing: true },
        activeDrawing: "1",
        drawingPdf: null, // initialize fetch
        fetchDrawing: fetchDrawingMock
      };

      shallow(<Drawing {...props}/>);
      expect(fetchDrawingMock).toHaveBeenCalledTimes(1);
      expect(fetchDrawingMock).toHaveBeenCalledWith(props.activeProject, props.activeDrawing);
    });

  it('check that fetching of drawing is not called when package is not assembly', () => {
      const fetchDrawingMock = jest.fn();
      const props = {
        activeProject: { id: "1", isAssembly: false },
        drawingPdf: null, // initialize fetch
        fetchDrawing: fetchDrawingMock
      };

      shallow(<Drawing {...props}/>);
      expect(fetchDrawingMock).toHaveBeenCalledTimes(0);
    });

    it('check fetching of drawing when active project changes and the new has no drawing url', () => {
      const fetchDrawingMock = jest.fn();
      const props = {
        activeProject: { id: "1", isAssembly: true, hasDrawing: true },
        drawingPdf: 'a link',
        fetchDrawing: fetchDrawingMock
      };

      const wrapper = shallow(<Drawing {...props}/>);
      expect(fetchDrawingMock).toHaveBeenCalledTimes(0); // already had a link, should not fetch

      const updateProps = {
        activeProject: { id: "2", isAssembly: true, hasDrawing: true },
        activeDrawing: "1",
        drawingPdf: null,
        fetchDrawing: fetchDrawingMock
      };
      wrapper.setProps(updateProps);
      expect(fetchDrawingMock).toHaveBeenCalledTimes(1);
      expect(fetchDrawingMock).toHaveBeenCalledWith(updateProps.activeProject, updateProps.activeDrawing);
    });
});
