import { Strophe, $build, $iq, $msg, $pres } from "strophe.js";
import 'strophejs-plugin-pubsub';
import 'strophejs-plugin-muc';
import 'strophejs-plugin-roster';
import './plugins/strophe.chatstates';
import 'strophejs-plugin-rsm';
import 'strophejs-plugin-mam';

import { tabUniqId } from "Utils/tabUniqId";

import { types, applySnapshot, destroy } from "mobx-state-tree";
import { observable, computed, autorun } from "mobx";
import Conference from "./Conference";

const BOSH_LOCATION = "/http-bind/"
const BOSH_PROTOCOL = "ws"
const RESOURCE = tabUniqId('web')
const XMPP_DOMAIN = "xmpp.sogaz.ru"
const CONFERENCE_DOMAIN = "conference.xmpp.sogaz.ru"


class ChatStore {
  // CurrentUser
  @observable user;

  // Conference
  @observable conference;

  // Chat statuses
  @observable status = null

  @computed get isConferenceJoined() {
    const connected = this.status == Strophe.Status.CONNECTED
    if (!connected) return false

    const roomJoined = this.conference && this.conference.isJoined;
    if (!roomJoined) return false

    return true
  }

  @computed get isConnected() {
    return this.status == Strophe.Status.CONNECTED
  }

  @computed get isConnecting() {
    return this.status == Strophe.Status.CONNECTING
  }

  @computed get isDisconnected() {
    return this.status == Strophe.Status.DISCONNECTED
  }

  @computed get isDisconnecting() {
    return this.status == Strophe.Status.DISCONNECTING
  }

  @computed get isConnfail() {
    return this.status == Strophe.Status.CONNFAIL
  }

  // Messages
  @observable messages = []

  constructor() {
    const options = { protocol: BOSH_PROTOCOL }
    this.connection = new Strophe.Connection(BOSH_LOCATION, options);
  }

  connect({user, room}) {
    const { email, token } = user;
    let jid = [email.split('@')[0], 'xmpp.sogaz.ru'].join('@');
    jid = [jid, RESOURCE].join("/")

    this.user = {
      email: email,
      nickname: email.split("@")[0],
      jid: jid,
      password: token
    }

    const { order_code, order_token } = room;
    this.conference = new Conference({
      name: `Заказ №${order_code}`,
      jid: [order_code.toLowerCase(), CONFERENCE_DOMAIN].join('@'),
      password: order_token,
      connection: this.connection,
      chat: this
    })

    this.connection.connect(
      this.user.jid, this.user.password,
      (status) => { this.status = status }
    );

    this.connectionHandler = autorun(() => {
      if (this.isConnected) this.onConnected()
    })
  }

  reconnect() {
    if (!this.user) return true

    this.connection.connect(
      this.user.jid, this.user.password,
      (status) => { this.status = status }
    );
  }

  disconnect() {
    this.connectionHandler();
    this.connection.options.sync = true;
    this.conference.leave();
    this.conference.leave();
    this.connection.flush();
    this.connection.reset()
    this.connection.disconnect()
  }

  onConnecting = () => {
    console.log('Strophe is connecting.');
  }

  onConnected = (reconnecting) => {
    // Prepend conference
    this.conference.prepend()

    // Solves problem of returned PubSub BOSH response not received by browser
    this.connection.flush();
  }
}

export default ChatStore
