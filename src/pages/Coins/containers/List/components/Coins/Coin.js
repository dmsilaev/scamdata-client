import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { computed, observable } from "mobx";
import { withRouter } from "react-router-dom";
import NumberFormat from "react-number-format";

import classNames from "classnames";
import moment from "Utils/moment";
import { fullName } from "Utils/fullName";
// import { formatMessage } from "Utils/formatMessage";

import Price from "Shared/ui/Price";

@withRouter
@observer
class Coin extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  @computed get createdAt() {
    const { coin } = this.props;
    return moment(created_at).format("DD.MM.YYYY");
  }

  @computed get checkIn() {
    const { check_in } = this.props.coin;
    return moment(check_in).format("DD.MM.YYYY")
  }

  @computed get checkOut() {
    const { check_out } = this.props.coin;
    return moment(check_out).format("DD.MM.YYYY")
  }

  @computed get status() {
    const { draft, state } = this.props.coin;

    if (state == "booked") {
      return {
        label: "status booked",
        text: formatMessage('coins.statuses.booked')
      }
    }
    else if (state == "confirmed" && draft) {
      return {
        label: "status draft",
        text: formatMessage('coins.statuses.confirmed'),
        description: formatMessage('coins.statuses.confirmed_description')
      }
    }
    else if (state == "confirmed" && !draft) {
      return {
        label: "status confirmed",
        text: formatMessage('coins.statuses.confirmed')
      }
    }
    else if (state == "cancelled") {
      return {
        label: "status cancelled",
        text: formatMessage('coins.statuses.cancelled')
      }
    }
    else {
      return {
        label: "status",
        text: formatMessage('coins.statuses.unknown')
      }
    }
  }

  @computed get name() {
    return this.props.coin.name;

  }

  @computed get id() {
    return this.props.coin.id;

  }

  @computed get symbol() {
    return this.props.coin.symbol;

  }

  @computed get exchanges() {
    return this.props.coin.exchanges.map((e) => {
              return e.name+"\n"
            })
  }

  @computed get infoPath() {
    const { _id } = this.props.coin;
    return ["/coins", _id, "info"].join("/");
  }


  clickHandler(e) {
    e.preventDefault();
    this.props.history.push(this.infoPath)
  }

  render() {
    const className = classNames("coins-table__tr", {
      active: this.isActive
    })
    return (

      <div  onClick={this.clickHandler} className={className}>
        <div className="coins-table__td">{this.id}</div>
        <div className="coins-table__td">{this.symbol}</div>
        <div className="coins-table__td">{this.name}</div>
        <div className="coins-table__td">{this.exchanges}</div>
      </div>
    );
  }
}

Coin.propTypes = {
  coin: PropTypes.object.isRequired
}

export default Coin;
