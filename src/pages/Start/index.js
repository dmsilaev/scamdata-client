import React, { Component } from "react";
import PropTypes from "prop-types"
import { observer, inject, Provider } from "mobx-react";
import { autorun, observable } from "mobx";
import { Switch, Route } from "react-router-dom";



@observer
class Start extends Component {


    render() {


        return (

                <div className="layout__page">

                    <div className="layout__page-content">
                        lol
                    </div>
                </div>

        );
    }
}

export default Start;
