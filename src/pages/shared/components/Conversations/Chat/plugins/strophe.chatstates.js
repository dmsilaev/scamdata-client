/**
 * Chat state notifications (XEP 0085) plugin
 * @see http://xmpp.org/extensions/xep-0085.html
 */
import {
  $msg,
  Strophe
} from 'strophe.js';

Strophe.addConnectionPlugin('chatstates', {
  init: function (connection) {
    this._connection = connection;

    Strophe.addNamespace('CHATSTATES', 'http://jabber.org/protocol/chatstates');
  },

  statusChanged: function (status) {
    if (status === Strophe.Status.CONNECTED ||
      status === Strophe.Status.ATTACHED) {
      this._connection.addHandler(
        this._notificationReceived,
        Strophe.NS.CHATSTATES, "message"
      );
    }
  },

  addActive: function (message) {
    return message.c('active', {
      xmlns: Strophe.NS.CHATSTATES
    }).up();
  },

  _notificationReceived: function (message) {
    const jid = message.getAttribute('from')

    const errors = message.getElementsByTagName('error')
    if (errors.length > 0)
      return true;

    const composing = message.getElementsByTagName('composing')[0]
    const paused = message.getElementsByTagName('paused')[0]
    const active = message.getElementsByTagName('active')[0]
    const inactive = message.getElementsByTagName('inactive')[0]
    const gone = message.getElementsByTagName('gone')[0]

    if (composing.length > 0) {
      console.log("Composing message: ", jid)
    }

    if (paused.length > 0) {
      console.log("Paused message: ", jid)
    }

    if (active.length > 0) {
      console.log("Active: ", jid)
    }

    if (inactive.length > 0) {
      console.log("Inactive: ", jid)
    }

    if (gone.length > 0) {
      console.log("Gone: ", jid)
    }

    return true;
  },

  sendActive: function (jid, type) {
    this._sendNotification(jid, type, 'active');
  },

  sendComposing: function (jid, type) {
    this._sendNotification(jid, type, 'composing');
  },

  sendPaused: function (jid, type) {
    this._sendNotification(jid, type, 'paused');
  },

  sendInactive: function (jid, type) {
    this._sendNotification(jid, type, 'inactive');
  },

  sendGone: function (jid, type) {
    this._sendNotification(jid, type, 'gone');
  },

  _sendNotification: function (jid, type = 'chat', notification) {
    const message = $msg({
        to: jid,
        type: type
      })
      .c(notification, {
        xmlns: Strophe.NS.CHATSTATES
      })

    this._connection.send(message)
  }
});