import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

import Traveller from "./Traveller";

@observer
class Travellers extends Component {
  render() {
    let number = 0;

    const listItems = this.props.travellers.map((traveller) => {
      number++;
      return <Traveller key={traveller.id} number={number} traveller={traveller} />
    })

    return (
      <div className="travellers divided">
        <div className="travellers__row header">
          <div className="travellers__column title">ФИО</div>
          <div className="travellers__column document">Номер полиса</div>
        </div>
        {listItems}
      </div>
    );
  }
}

Travellers.propTypes = {
  travellers: PropTypes.object.isRequired
}

export default Travellers;
