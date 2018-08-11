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
// import Menu from './shared/components/Menu';
// import Notifications from "./Notifications";
// import Orders from "./Orders";
// import Login from "./Login";
// import NotFound from "./NotFound";
//

@inject("store")
@inject("chatStore")

@observer
export default class App extends Component {
    render() {
        const isLoggedIn = this.props.store.userStore.authenticated;

        return (
            <Router>
                <div className="layout">
                     <Menu />

                    <Switch>
                        <Redirect
                            exact
                            from='/'
                            to='/coins'
                        />

                        <PrivateRoute
                            path="/exchanges"
                        />

                        <Route
                            exact
                            path="/login"
                            component={Login}
                        />

                        <Route
                            component={NotFound}
                        />
                    </Switch>

                    {isLoggedIn && <Notifications />}

                    {process.env.NODE_ENV == "development" && <DevTools position={{ bottom: 5, right: 20 }}/>}
                </div>
            </Router>
        );
    }
}
