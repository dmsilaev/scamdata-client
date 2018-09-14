import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import CloseIcon from "react-icons/lib/md/close";
import MdKeyboardBackspaceIcon from "react-icons/lib/md/keyboard-backspace";

@observer
class Navigation extends Component {
  render() {
    const { order } = this.props;

    return (
      <div className="navigation shadow">
        <div className="content">
          <div className="navigation__item">
            <Link to={`/orders/${order.id}/info`}>
              <i className="icon">
                <MdKeyboardBackspaceIcon />
              </i>
            </Link>
          </div>

          <div className="navigation__item header">
            <FormattedMessage
              id='orders.order_number'
              className="caption"
              values={{code: order.order_code}}
            />
          </div>

          <div className="navigation__item">
            <Link to="/orders">
              <i className="icon">
                <CloseIcon />
              </i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  order: PropTypes.object.isRequired
}

export default Navigation;
