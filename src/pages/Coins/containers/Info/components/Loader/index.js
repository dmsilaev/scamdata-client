import React, { Component } from "react";
import Loader from "react-loaders";

class InfoLoader extends Component {
  render() {
    return (
      <div className="info__content">
        <div className="loader">
          <Loader
            type="line-scale"
            active
            color={"#999"}
          />
        </div>
      </div>
    );
  }
}

export default InfoLoader;
