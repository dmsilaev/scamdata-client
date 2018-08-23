import React, { Component } from "react";
import PropTypes from "prop-types";
import { autorun, computed, observable } from "mobx";
import { observer, inject } from "mobx-react";
import _pick from "lodash/pick";

import Chat from "./Chat";
import ConversationStore from "Stores/ConversationStore";
import Messages from "./Messages";
import Loader from "./Loader";
import Control from "./Control";

@inject("store", "chatStore", "chatNotificationsStore")
@observer
class Conversations extends Component {
  @observable conference = undefined;

  @computed get isConnected() {
    return this.conference
      && this.conference.isJoined
  }

  componentDidMount() {
    const { order, chatStore, chatNotificationsStore } = this.props;

    this.connectionHandler = autorun(() => {
      if (chatStore.isConnected)
        chatStore.getConference(order.id)
          .then((conference) => conference.connectToRoom())
          .then((conference) => {
            if(chatNotificationsStore.excludeFromJIDs.indexOf(conference.jid) == -1)
              chatNotificationsStore.excludeFromJIDs.push(conference.jid)
            return conference
          })
          .then((conference) => this.conference = conference)
    })
  }

  componentWillUnmount() {
    const { chatNotificationsStore } = this.props;
    this.connectionHandler()

    if (this.isConnected){
      this.conference.disconnectFromRoom()
      const jidIndex = chatNotificationsStore.excludeFromJIDs.indexOf(this.conference.jid)
      chatNotificationsStore.excludeFromJIDs.splice(jidIndex, 1)
    }
  }

  render() {
    return (
      <div className="conversations">
        <div className="conversations__body">
          {this.isConnected
            ? <Messages conversation={this.conference} />
            : <Loader />
          }
        </div>

        {this.conference &&
          <Control conversation={this.conference} />
        }
      </div>
    );
  }
}

Conversations.propTypes = {
  order: PropTypes.object.isRequired
}

export default Conversations;
