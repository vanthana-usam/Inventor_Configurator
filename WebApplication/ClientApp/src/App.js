 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Surface from '@hig/surface';
import './app.css';
import Toolbar from './components/toolbar';
import TabsContainer from './components/tabsContainer';
import ProjectSwitcher from './components/projectSwitcher';
import { showAdoptWithParamsFailed, fetchShowParametersChanged } from './actions/uiFlagsActions';
import { detectToken } from './actions/profileActions';
import ModalProgress from './components/modalProgress';
import { adoptWithParamsFailed, embeddedModeEnabled, embeddedModeUrl, adoptWithParamsProgressShowing, errorData } from './reducers/mainReducer';
import { adoptProjectWithParameters } from './actions/adoptWithParamsActions';

export class App extends Component {
  constructor(props) {
    super(props);
    props.detectToken();
  }
  componentDidMount() {
    if (!this.props.embeddedModeEnabled)
      this.props.fetchShowParametersChanged();

    if (this.props.embeddedModeUrl != null)
      this.props.adoptProjectWithParameters(this.props.embeddedModeUrl);
  }

  render () {
    const showToolbar = !this.props.embeddedModeEnabled;

    return (
      <Surface className="fullheight" id="main" level={200}>
        { showToolbar &&
          <Toolbar>
            <ProjectSwitcher />
          </Toolbar>
        }
        <TabsContainer/>
        {this.props.adoptWithParamsProgressShowing &&
          <ModalProgress
              open={true}
              title="Loading Content"
              label=" "
              icon="/Assembly_icon.svg"/>
        }
      </Surface>
    );
  }
}

/* istanbul ignore next */
export default connect(function (store) {
  return {
    adoptWithParamsProgressShowing: adoptWithParamsProgressShowing(store),
    adoptWithParamsFailed: adoptWithParamsFailed(store),
    embeddedModeEnabled: embeddedModeEnabled(store),
    embeddedModeUrl: embeddedModeUrl(store),
    errorData: errorData(store)
  };}, {
    showAdoptWithParamsFailed, adoptProjectWithParameters, fetchShowParametersChanged, detectToken
})(App);

