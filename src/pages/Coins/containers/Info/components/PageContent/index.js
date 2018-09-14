import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";

import Navigation from "../Navigation";
import Header from "../Header";
import Reservations from "../Reservations";
import Loader from "../Loader";
import Manager from "../Manager";

@withRouter
@inject("orderStore")
@observer
class PageContent extends Component {
  render() {
    const { isFetched, order } = this.props.orderStore

    return (
      isFetched
        ? <div className="info__content">
            <Navigation />
            <Header />
            <div className="reservation-group">
              <div className="reservation-group__content">
                <Manager order={order} />
                <Reservations reservations={order.reservations} />
              </div>
            </div>

            <div className="actions">
              <Link
                to={`/orders/${order.id}/conversation`}
                className="button gray"
              >Комментарии</Link>
            </div>
          </div>

        : <Loader />
    );
  }
}

export default PageContent;
