import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { observer, inject, Provider } from "mobx-react";
import { autorun, observable } from "mobx";
import { Scrollbars } from 'react-custom-scrollbars';

import PageContent from "./components/PageContent";

import OrderStore from "Stores/OrdStore";

@withRouter
@observer
class Info extends Component {
  componentDidMount() {
    this.fetcher = autorun(() => {
      const { id } = this.props.match.params;
      this.props.orderStore.fetch(id);
    })
  }

  componentWillUnmount() {
    const { orderStore } = this.props;
    this.fetcher()
    orderStore.clear();
  }

  render() {
    const { orderStore } = this.props;

    return (
      <Provider orderStore={orderStore}>
        <div className="page__info very wide">
          <div className="page__info-wrapper">
            <Scrollbars>
              <PageContent />
            </Scrollbars>
          </div>
        </div>
      </Provider>
    );
  }
}

Info.defaultProps = {
  orderStore: OrderStore.create()
}

export default Info;
