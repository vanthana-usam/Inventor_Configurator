 

import axios from 'axios';

const AuthorizationHeader = 'Authorization';

/** Kind-of data layer, which hides all interaction with backend. */
class Repository {

    /** Get list of projects */
    async loadProjects() {
        const response = await axios.get("/projects");
        return response.data;
    }
    /** Delete projects */
    async deleteProjects(projectList) {
        const response = await axios.delete("/projects", {
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(projectList)
        });
        return response.data;
    }
    /** Get project parameters */
    async loadParameters(projectName) {
        const response = await axios.get("/parameters/" + projectName);
        return response.data;
    }

    /** Get the information if we should show the strip informing customer that parameters changed */
    async loadShowParametersChanged() {
        const response = await axios.get("/showParametersChanged");
        return response.data;
    }

    /** Send to server if we want to permanently enable/disable the showing of parameters changed banner */
    async sendShowParametersChanged(value) {
        const response = await axios.post("/showParametersChanged", value, {
            headers: {
                'content-type': 'application/json'
            }
        });
        return response.data;
    }

    /** Load user's profile */
    async loadProfile() {
        const response = await axios.get("/login/profile");
        return response.data;
    }

    /**Uploads package to the server */
    async uploadPackage(form) {
        const formData = new FormData();

        formData.append('package', form.file);
        formData.append('root', form.root);
        const result = await axios.post('/projects', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    getAccessToken() { return this._accessToken; }

    setAccessToken(value) {
        this._accessToken = value;
        axios.defaults.headers.common[AuthorizationHeader] = `Bearer ${value}`;
    }

    forgetAccessToken() {
        delete axios.defaults.headers.common[AuthorizationHeader];
        delete this._accessToken;
    }

    hasAccessToken() { return !! this._accessToken; }

    /** Get BOM data */
    async loadBom(bomUrl) {
        const response = await axios.get(bomUrl);
        return response.data;
    }

    /** Get list of drawings */
    async loadDrawingsList(drawingsListUrl) {
        const response = await axios.get(drawingsListUrl);

        return response.data;
    }
}

/** Singleton with repo */
export default new Repository();