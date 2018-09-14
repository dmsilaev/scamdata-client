import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";

@inject("orderStore")
@observer
class Header extends Component {
  render() {
    const { order } = this.props.orderStore;
    const { comment } = order;

    const { name, address, phone } = this.props.hotel;

    return (
      <div className="section divided">
        <div className="section__caption">
          {name}
        </div>

        <div className="section__content">
          <div className="options compact">
            <div className="options__item">
              <div className="key">
                <FormattedMessage id='hotel.address' />
              </div>
              <div className="value">
                {address.location}
              </div>
            </div>

            <div className="options__item">
              <div className="key">
                <FormattedMessage id='hotel.phone' />
              </div>
              <div className="value">
                <NumberFormat
                  value={phone}
                  format="+# (###) ###-##-##"
                  displayType={"text"}
                />
              </div>
            </div>

            {comment &&
              <div className="options__item">
                <div className="key">
                  <FormattedMessage id='orders.comment' />
                </div>
                <div className="value">
                  {comment}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  hotel: PropTypes.object.isRequired
}

export default Header;
