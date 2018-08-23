import React, { Component } from "react";
import PropTypes from "prop-types";
import { autorun } from "mobx";
import { observer, inject } from "mobx-react";
import { computed } from "mobx";
import { dateFormat } from "Utils/dateFormat";

import RemoveIcon from "react-icons/lib/md/highlight-remove";

@observer
class Message extends Component {
  @computed get klassMsg() {
    const { is_owner } = this.props.message;
    return is_owner ? "msg from" : "msg to"
  }

  render() {
    const { created_at, text, author } = this.props.message;

    return (
      <div className={this.klassMsg}>
        <div className="msg__header">
          <div className="msg__header--author">
            {author}
          </div>
          <div className="msg__header--time">
            {dateFormat(created_at)}
          </div>

        </div>

        <div className="msg__body">
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  conversation: PropTypes.object.isRequired
}

export default Message;
