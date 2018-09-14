import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { FormattedMessage } from "react-intl";

@observer
class Manager extends Component {
  render() {
    const { comment, source } = this.props.order;

    const { first_name, last_name, phone, email, name } = source;

    return (
      <div className="section divided">
        <div className="section__content">
          <div className="options compact">
            <div className="options__item">
              <div className="key">
                <FormattedMessage id='orders.source' />
              </div>
              <div className="value">
                {name}
              </div>
            </div>
            <div className="options__item">
              <div className="key">
                <FormattedMessage id='orders.manager' />
              </div>
              <div className="value">
                {last_name} {first_name}
              </div>
            </div>

            <div className="options__item">
              <div className="key">
                <FormattedMessage id='orders.email' />
              </div>
              <div className="value">
                {email}
              </div>
            </div>

            {phone &&
              <div className="options__item">
                <div className="key">
                  <FormattedMessage id='orders.phone' />
                </div>
                <div className="value">
                  {phone}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Manager.propTypes = {
  order: PropTypes.object.isRequired
}

export default Manager;
