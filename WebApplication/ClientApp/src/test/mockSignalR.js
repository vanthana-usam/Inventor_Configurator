 

import * as signalR from '@aspnet/signalr';

const connectionMock = {
    onHandlers: {},
    start: function() {},
    on: function(name, fn) {
        this.onHandlers[name] = fn;
    },
    invoke: function() {},
    stop: function() {},
    simulateComplete: function(data, stats) {
        this.onHandlers['onComplete'](data, stats);
    },
    simulateErrorWithReport: function(jobId, link) {
        this.onHandlers['onError']({ errorType: 1, jobId, reportUrl: link });
    },
    simulateErrorWithMessage: function(jobId, message, title) {
        this.onHandlers['onError']({ errorType: 2, jobId, messages: [message], title });
    }
};

function hubConnectionBuilder() {}

hubConnectionBuilder.prototype.withUrl = function(/*url*/) {
    return {
        configureLogging: function(/*trace*/) {
            return { build: function() { return connectionMock; }};
        }
    };
};

// eslint-disable-next-line no-import-assign
signalR.HubConnectionBuilder = hubConnectionBuilder;

export default connectionMock;