import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs, { Tab } from "@hig/tabs";
import ProjectList from './projectList';
import ForgeView from './forgeView';
import ParametersContainer from './parametersContainer';
import Bom from './bom';
import Downloads from './downloads';
import './tabs.css';
import { embeddedModeEnabled, activeTabIndex } from '../reducers/mainReducer';
import { updateActiveTabIndex } from '../actions/uiFlagsActions';
import Drawing from './drawing';

export class TabsContainer extends Component {

    onTabChange(index) {
      this.props.updateActiveTabIndex(index);
    }

    render() {

        const idx = this.props.activeTabIndex;
        const showProjectsTab = this.props.embeddedModeEnabled;
        const showParameters = this.props.embeddedModeEnabled;

        return (
          <div className="tabsContainer">
            <Tabs
              className="fullheight"
              align="center"
              showTabDivider={false}
              onTabChange={(index) => { this.onTabChange(index); }}
              onTabClose={() => { }}
              activeTabIndex={idx}
            >
              {!showProjectsTab &&
                <Tab label={<span className="tab-label">Projects</span>}>
                  <div id="project-list" className="tabContent fullheight">
                    <ProjectList />
                  </div>
                </Tab>
              }
              <Tab label={<span className="tab-label">Model</span>}>
                <div id="model" className='tabContent fullheight'>
                  <div className='inRow fullheight'>
                    {!showParameters &&
                      <ParametersContainer />
                    }
                    <ForgeView />
                  </div>
                </div>
              </Tab>
              <Tab label={<span className="tab-label">BOM</span>}>
                <div id="bom" className="tabContent fullheight">
                  <Bom />
                </div>
              </Tab>
              <Tab label={<span className="tab-label">Drawing</span>}>
                <div id="drawing" className="tabContent fullheight">
                  <Drawing />
                </div>
              </Tab>
              <Tab label={<span className="tab-label">Downloads</span>}>
                <div id="downloads" className="tabContent fullheight">
                  <Downloads />
                </div>
              </Tab>
            </Tabs>
          </div>
        );
    }
}

/* istanbul ignore next */
export default connect(function (store){
  return {
    activeTabIndex: activeTabIndex(store),
    embeddedModeEnabled: embeddedModeEnabled(store)
  };
}, { updateActiveTabIndex } )(TabsContainer);
