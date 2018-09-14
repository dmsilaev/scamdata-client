import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import Coins from "../Coins";

@withRouter
@inject("coinsStore")
@observer
export default class PageContent extends Component {
  render() {
    const { coins } = this.props.coinsStore;
    return (
      <div className="page__body fluid">
        <div className="page__caption">
          Coins ({coins.length})
        </div>

        <div className="page__content">
          <Coins coins={coins} />
        </div>
      </div>
    );
  }
}
