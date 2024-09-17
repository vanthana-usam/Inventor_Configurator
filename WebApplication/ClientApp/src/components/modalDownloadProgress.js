 

import React, { Component } from 'react';
import Modal from '@hig/modal';
import ProgressBar from '@hig/progress-bar';
import Typography from "@hig/typography";
import './modalProgress.css';
import merge from "lodash.merge";
import Button from '@hig/button';
import HyperLink from './hyperlink';
import CreditCost from './creditCost';
import ReportUrl from './reportUrl';

export class ModalDownloadProgress extends Component {

    render() {
        const modalStyles = /* istanbul ignore next */ styles =>
        merge(styles, {
          modal: {
                window: { // by design
                    width: "371px",
                    height: "auto"
                }
            }
        });

        const done = this.props.url != null;
        const iconAsBackgroundImage = {
            width: '48px',
            height: '48px',
            backgroundImage: 'url(' + this.props.icon + ')',
          };

        return (
            <Modal
              open={this.props.open}
              title={this.props.title}
              onCloseClick={this.props.onClose}
              percentComplete={null}
              stylesheet={modalStyles}>
              <div className="modalContent">
                  <div style={iconAsBackgroundImage}/>
                  <div className="modalAction" fontWeight="bold">
                      <Typography>
                        {this.props.label ? this.props.label : "Missing label."}
                      </Typography>
                      {!done && <ProgressBar className="modalProgress"/>}
                  </div>
              </div>
              {(done) &&
                <React.Fragment>
                    <CreditCost/>
                    <ReportUrl/>
                    <div className="modalLink">
                        <HyperLink
                            onAutostart={(downloadHyperlink) => {
                                downloadHyperlink.click();
                            }}
                            /* onUrlClick={this.props.onClose} */ // onClose in onUrlClick colides with onAutostart, causing the dialog to close itself when download starts. But we dont want it to close itself.
                            prefix="Download should start automatically. If it doesn't, "
                            link="click here" href={this.props.url}
                            suffix=" to download it manually."
                            download={true}
                        />
                        <Button className="button" style={
                            { width: '116px', height: '36px', borderRadius: '2px', marginLeft: '12px'}}
                            type="primary"
                            size="small"
                            title="Ok"
                            onClick={this.props.onClose}
                        />
                    </div>
                </React.Fragment>
              }
          </Modal>
        );
    }
}

/* istanbul ignore next */
export default ModalDownloadProgress;