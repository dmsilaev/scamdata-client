import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { dateRangeFormat } from "Utils/dateFormat";
import { withRouter, Link } from "react-router-dom";
import { computed } from "mobx";

@withRouter
@inject("ordersStore", "orderStore")
@observer
class OrderDetails extends Component {
  constructor(props) {
    super(props);

    this.cancelHandler = this.cancelHandler.bind(this);
    this.successCancelHandler = this.successCancelHandler.bind(this);

    this.archiveHandler = this.archiveHandler.bind(this);
    this.successArchiveHandler = this.successArchiveHandler.bind(this);
  }

  cancelHandler(e) {
    e.preventDefault();

    this.props.orderStore.cancel()
      .then(this.successCancelHandler)
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
    const { order } = this.props.orderStore;
    const { id, address, check_in, check_out, comment, permissions } = order;

    const edit_path = ["/orders", id, "edit"].join("/");
    const history_path = ["/orders", id, "history"].join("/");

    return (
      <div className="section">
        <div className="section__content">
          <div className="options compact">
            <div className="options__item">
              <div className="key">Адрес</div>
              <div className="value">
                {address.location}
              </div>
            </div>
            <div className="options__item">
              <div className="key">Даты</div>
              <div className="value">
                {dateRangeFormat(check_in, check_out)}
              </div>
            </div>
            {comment &&
              <div className="options__item">
                <div className="key">Комментарий</div>
                <div className="value">
                  {comment}
                </div>
              </div>
            }
          </div>
        </div>

        <div className="section__footer">
          <form className="form">
            <div className="form__control">
              {permissions.editable &&
                <Link to={edit_path} className="button gray">
                  Продолжить бронирование
                </Link>
              }

              {permissions.cancelable &&
                <button
                  className="button red"
                  onClick={this.cancelHandler}
                >
                  Отменить заказ
                </button>
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
                <Link to={history_path} className="button gray">
                  История заказа
                </Link>
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default OrderDetails;
