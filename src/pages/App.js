import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

// import PrivateRoute from "./shared/components/PrivateRoute";
//
import Menu from './shared/components/Menu';
// import Notifications from "./Notifications";
// import Orders from "./Orders";
import Start from "./Start";
// import NotFound from "./NotFound";
//
@inject("store")

@observer
export default class App extends Component {
    render() {
        // const isLoggedIn = this.props.store.userStore.authenticated;

        return (
            <Router>
                <div className="layout">
                     <Menu />
                    л

                    <Switch>
                        <Route
                            component={Start}
                        />

                        />
                    </Switch>



                    {process.env.NODE_ENV == "development" && <DevTools position={{ bottom: 5, right: 20 }}/>}
                </div>
            </Router>
        );
    }
}
