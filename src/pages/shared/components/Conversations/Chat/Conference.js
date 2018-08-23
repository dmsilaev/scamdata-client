import { Strophe, $build, $iq, $msg, $pres } from "strophe.js";
import { action, observable, computed } from "mobx";
import moment from "Utils/moment";

class Conference {
  constructor(props) {
    const { jid, name, password, chat, connection } = props;
    this.jid = jid;
    this.name = name;
    this.user = chat.user;
    this.password = password;
    this.chat = chat;
    this.connection = props.connection;
  }

  @observable jid
  @observable name
  @observable user
  @observable status = null;
  @observable password
  @observable messages = []
  @observable occupations = []

  @computed get isJoined() {
    return this.status === 'joined'
  }

  @action async prepend() {
    try {
      const result = await this.fetchRooms();

      let rooms = result.getElementsByTagName('item')
      rooms = Array.from(rooms)

      const room = rooms
        .map(room => this.getRoom(room))
        .find(room => room.jid == this.jid)

      if (!room)
        await this.createRoom()

      this.join()
    } catch(e) {
      console.log(e)
    }
  }

  async join() {
    const { nickname } = this.chat.user;

    try {
      // Fetch occupations
      const result = await this.fetchOccupants()

      let occupations = result.getElementsByTagName('item')
      occupations = Array.from(occupations)

      occupations = occupations
        .map(occupation => this.getOccupation(occupation))

      this.occupations = occupations

      // Join to room
      this.connection.muc.join(
        this.jid, nickname, this.onMessage, this.onPresence, this.onRoster
      )

      // Fetch histories
      await this.fetchHistory()

      // Change status
      this.status = 'joined'
    } catch(e) {
      console.log(e)
    }
  }

  leave() {
    // room, nick, handler_cb, exit_msg
    this.connection.muc.leave(this.jid, this.nick);
  }

  // Create new room for conference
  createRoom() {
    const promise = new Promise((resolve, reject) => {
      this.connection.muc.createInstantRoom(this.jid,
        (result) => resolve(result),
        (reason) => reject(reason)
      )
    })

    return promise;
  }

  // Fetch rooms as promise
  fetchRooms() {
    const server = "conference.xmpp.sogaz.ru"

    const promise = new Promise((resolve, reject) => {
      this.connection.muc.listRooms(server,
        (result) => resolve(result),
        (reason) => reject(reason)
      )
    })

    return promise;
  }

  getRoom(nodeItem) {
    const name = nodeItem.getAttribute('name')
    const jid = nodeItem.getAttribute('jid')

    return { jid, name }
  }

  // Fetch occupations as promise
  fetchOccupants() {
    const promise = new Promise((resolve, reject) => {
      this.connection.muc.queryOccupants(this.jid,
        (result) => resolve(result),
        (reason) => reject(reason)
      )
    })

    return promise;
  }

  getOccupation(nodeItem) {
    const name = nodeItem.getAttribute('name')
    const jid = nodeItem.getAttribute('jid')

    return { jid, name }
  }

  // Send status
  sendChatState (status, type = "groupchat") {
    if (status === "active") {
      this.connection.chatstates.sendActive(this.jid, type);
    } else if (status === "composing") {
      this.connection.chatstates.sendComposing(this.jid, type);
    } else if (status === "paused") {
      this.connection.chatstates.sendPaused(this.jid, type);
    }
  }

  // Get history
  async fetchHistory() {
    const promise = new Promise((resolve, reject) => {
      this.connection.mam.query(this.jid, {
        onMessage: (message) => {
          return true
        },
        onComplete: (response) => {
          return resolve(true)
        }
      })
    })

    return promise;
  }


  // Parse messages
  onMessage = (msg) => {
    try {
      const isHistory = !!msg.querySelector('result forwarded')

      let message, delay;
      if (isHistory) {
        message = msg.querySelector('result forwarded message')
        delay = msg.querySelector('result forwarded delay')
      } else {
        message = msg
        delay = msg.querySelector('delay')
      }

      const jid = message.getAttribute('from'),
        resource = Strophe.getResourceFromJid(jid),
        sender = resource && Strophe.unescapeNode(resource) || '',
        type = message.getAttribute('type'),
        msgId = message.getAttribute('id')

      let subject = message.querySelector('subject');
      if (subject) {
        console.log("Set subject to: ", subject.textContent)
        return true;
      }

      let stamp;
      if (delay) {
        stamp = delay.getAttribute('stamp');
      } else {
        stamp = moment().toISOString();
      }

      let body;
      if (type === "error") {
        body = message.querySelector("error text").textContent
      } else {
        body = message.querySelector("body").textContent
      }

      let from;
      if (type === 'groupchat') {
        from = Strophe.unescapeNode(Strophe.getResourceFromJid(message.getAttribute('from')));
      } else {
        from = Strophe.getBareJidFromJid(message.getAttribute('from'));
      }

      const isOwner = this.user.nickname === from;


      const msgObject = {
        id: msgId,
        created_at: stamp,
        text: body,
        is_owner: this.user.nickname === from,
        author: from
      }

      if (!this.isDublicate(msgObject))
        this.messages.push(msgObject)

      return true;
    } catch (e) {
      console.log(e);
    } finally {
      return true
    }
  }

  isDublicate (message) {
    return this.messages.find(msg => message.id == msg.id)
  }

  messageTimeStamp (message) {
    let stamp = message.getElementsByTagName('delay')[0]
    stamp = stamp.getAttribute('stamp')

    return stamp;
  }

  sendMessage ({ text }) {
    const room = this.jid
    this.connection.muc.groupchat(room, text)
  }

  // Recieved presence
  onPresence (presence) {
    console.log(presence);
    return true;
  }

  // Recieved roster
  onRoster (roster) {
    console.log(roster);
    return true
  }
}

export default Conference;
