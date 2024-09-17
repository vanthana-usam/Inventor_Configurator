 

import React, { Component } from 'react';
import Typography from "@hig/typography";

export class HyperLink extends Component {

    componentDidMount() {
        if (this.props.onAutostart)
            this.props.onAutostart(this.downloadHyperlink);
    }

    render() {
        const downloadProps =  {};
        if(this.props.download) {
          downloadProps['download'] = '';
        }

        const downloadLink = <a href={this.props.href} onClick={(e) => {
            e.stopPropagation();
            if (this.props.onUrlClick) this.props.onUrlClick();
        }} ref = {(h) => {
            this.downloadHyperlink = h;
        }} {...downloadProps}>{this.props.link}</a>;

      return(
          <Typography style={{ width: 'fit-content'}}>
            {this.props.prefix}{downloadLink}{this.props.suffix}
          </Typography>
      );
    }
  }

  export default HyperLink;