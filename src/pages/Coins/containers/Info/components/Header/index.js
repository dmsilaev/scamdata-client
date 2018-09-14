import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { fullName } from "Utils/fullName";
import { FormattedMessage } from "react-intl";

@inject("orderStore")
@observer
class Header extends Component {
  render() {
    const { order } = this.props.orderStore;
    const { first_name, last_name } = order.source;

    return (
      <div className="header">
        <FormattedMessage
          id='orders.order_number'
          values={{code: order.order_code}}
        />
      </div>
    );
  }
}

export default Header;
