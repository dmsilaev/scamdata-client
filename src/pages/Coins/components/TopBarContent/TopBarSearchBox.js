import React, { Component } from "react";

export default class TopBarSearchBox extends Component {
  render() {
    return (
      <div className="search-box">
        <form method="post" action="" className="form">
          <div className="row gutters">
            <div className="col col-6">
              <div className="form-item">
                <input placeholder="Строка поиска" disabled/>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
