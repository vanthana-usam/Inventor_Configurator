 

import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProjectAccountSwitcher from '@hig/project-account-switcher';
import { fetchProjects, updateActiveProject } from '../actions/projectListActions';
import { updateActiveTabIndex, invalidateDrawing } from '../actions/uiFlagsActions';
import { fetchParameters } from '../actions/parametersActions';
import {addLog} from '../actions/notificationActions';
import './projectSwitcher.css';

export class ProjectSwitcher extends Component {

    constructor(props) {
        super(props);
        this.onProjectClick = this.onProjectClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchProjects();
    }

    onProjectClick(event) {
        // depending on where exactly you click in the row (the anchor text vs outside of the text),
        // event.target.innerText is not sufficient match for the id. event.target.lastChild.textContent seems to be fine.
        const id = event.target.lastChild.textContent;
        this.props.updateActiveProject(id);
        // mark drawing as not valid if any available
        this.props.invalidateDrawing();
        // switch to the model tab
        this.props.updateActiveTabIndex(1);
        //this.props.fetchParameters(id);
        this.props.addLog('Selected: ' + id);
    }

    render() {
        return (
            <span id="PAS">
            <ProjectAccountSwitcher
                defaultProject={null}
                activeProject={this.props.projectList.activeProjectId}
                projects={this.props.projectList.projects}
                projectTitle="Projects"
                onClick={this.onProjectClick}
            />
            </span>
        );
    }
}

/* istanbul ignore next */
export default connect(function (store){
    return {
      projectList: store.projectList
    };
  }, { fetchProjects, fetchParameters, updateActiveProject, updateActiveTabIndex, addLog, invalidateDrawing } )(ProjectSwitcher);
