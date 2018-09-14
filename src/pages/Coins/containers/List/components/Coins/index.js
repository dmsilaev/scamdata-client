import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { coinsFilter } from "Utils/coinsFilter";

import Coin from "./Coin";
import Header from "./Header";
import Filter from "./Filter";

@withRouter
@inject("searchForm")
@observer

class Coins extends Component {



  render() {
    const { coins } = this.props




    const listItems = coins
                        .map((item) => {
                          return <Coin key={item.id} coin={item} />
                        })

    return (
      <div className="coins-table">
        <div className="coins-table__body">
          <Header />
          {listItems}
        </div>
      </div>
    );
  }
}

Coins.propTypes = {
  coins: PropTypes.object.isRequired
}


export default Coins;
