import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { observer, inject, Provider } from "mobx-react";
import { autorun, observable } from "mobx";

import Navigation from "./components/Navigation";
import Conversations from "Shared/components/Conversations";

import OrderStore from "Stores/OrdStore";

@withRouter
@observer
class Conversation extends Component {
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
    const { order, isFetched } = this.props.orderStore;

    return (
      <div className="page__info">
        <div className="page__info-wrapper">
          {isFetched &&
            <div className="info__content fluid">
              <Navigation order={order} />
              <Conversations order={order} />
            </div>
          }
        </div>
      </div>
    );
  }
}

Conversation.defaultProps = {
  orderStore: OrderStore.create()
}

export default Conversation;
