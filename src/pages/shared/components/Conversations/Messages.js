import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { autorun, computed } from "mobx";
import { Scrollbars } from 'react-custom-scrollbars';

import Message from "./Message";

@observer
class Messages extends Component {
  componentDidMount() {
    this.scrollBar.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollBar.scrollToBottom()
  }

  render() {
    const { conversation } = this.props;

    const listMsgs = conversation.messages
      .sort((before, after) => {
        return new Date(before.created_at) - new Date(after.created_at)
      })
      .map((message) => {
        return <Message key={message.id} conversation={conversation} message={message} />
      })

    return (
      <Scrollbars ref={(node) => { this.scrollBar = node; }}>
        <div className="messages">
          {listMsgs}
        </div>
      </Scrollbars>
    );
  }
}

Messages.propTypes = {
  conversation: PropTypes.object.isRequired
}

export default Messages;
