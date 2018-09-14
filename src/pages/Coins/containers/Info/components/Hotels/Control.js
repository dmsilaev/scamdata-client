import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { computed } from "mobx";
import { Link, withRouter } from "react-router-dom";

@withRouter
@inject("orderStore", "ordersStore")
@observer
class Control extends Component {

  constructor(props) {
    super(props);

    this.cancelHandler = this.cancelHandler.bind(this);
    this.successCancelHandler = this.successCancelHandler.bind(this);

    this.archiveHandler = this.archiveHandler.bind(this);
    this.successArchiveHandler = this.successArchiveHandler.bind(this);
  }

  @computed get editPath() {
    const { id, state } = this.props.orderStore.order;

    if (state == "created") {
      return ["/orders", id, "search"].join("/")
    } else if (state == "booked") {
      return ["/orders", id, "confirm"].join("/")
    } else {
      return ["/orders", id, "edit"].join("/")
    }
  }

  cancelHandler(e) {
    e.preventDefault();

    this.props.orderStore.cancel()
      .then(this.successCancelHandler);
  }

  successCancelHandler() {
    const { orderStore, ordersStore } = this.props;

    ordersStore.updateOne(orderStore.order);
  }

  archiveHandler(e) {
    e.preventDefault();

    this.props.orderStore.archive()
      .then(this.successArchiveHandler);
  }

  successArchiveHandler() {
    const { orderStore, ordersStore, history } = this.props;

    ordersStore.removeOne(orderStore.order);
    history.push("/orders");
  }

  render() {
    const { id, permissions } = this.props.orderStore.order;
    const historyPath = ["/orders", id, "history"].join("/");

    return (
      <form className="form">
        <div className="form__control">
          {permissions.editable &&
            <Link to={this.editPath} className="button green">
              Изменить заказ
            </Link>
          }

          {permissions.archivable &&
            <button
              className="button red"
              onClick={this.archiveHandler}
            >
              Удалить заказ
            </button>
          }

          {permissions.historyable &&
            <Link to={historyPath} className="button gray">
              История заказа
            </Link>
          }
        </div>
      </form>
    );
  }
}

export default Control;
