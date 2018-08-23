import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { computed, observable } from "mobx";
import { HotKeys } from 'react-hotkeys';
import { dateFormat } from "Utils/dateFormat";

import FormState from "Shared/form/FormState";
import fields from "./fields";
import FormItemText from "Shared/form/FormItemText";

@observer
class Control extends Component {
  @observable form = new FormState(fields);

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.successSubmitHandler = this.successSubmitHandler.bind(this)
    this.errorSubmitHandler = this.errorSubmitHandler.bind(this)
  }

  onSubmit(e) {
    this.form.onSubmit(e, {
      onSuccess: this.successSubmitHandler,
      onError: this.errorSubmitHandler
    })
  }

  successSubmitHandler() {
    const { conversation } = this.props;

    conversation.sendMessage(this.form.values())
    this.initializeForm()
  }

  errorSubmitHandler() {

  }

  initializeForm() {
    this.form = new FormState(fields);
  }

  render() {
    const keyMap = {
      'sendMsg': 'enter'
    };

    const handlers = {
      'sendMsg': this.onSubmit
    };

    return (
      <form className="conversations__tools">
        <HotKeys className="content" keyMap={keyMap} handlers={handlers}>
          <div className="message__input">
            <FormItemText
              field={this.form.$("text")}
              rows={1}
              showLabel={false}
              />
          </div>
          <div className="message__send">
            <button
              className="button green"
              onClick={this.onSubmit}>
              Отправить
            </button>
          </div>
        </HotKeys>
      </form>
    );
  }
}

Control.propTypes = {
  conversation: PropTypes.object.isRequired
}

export default Control;
