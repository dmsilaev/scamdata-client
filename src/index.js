import "./styles/main.scss";

import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { reaction } from "mobx";
import { AppContainer } from "react-hot-loader";

import AppStore from "./stores/AppStore";
import App from "./pages/App";

const store = AppStore.create();

const renderApp = Component => {
    render(
        <Provider  store={store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept(() => renderApp(App));
}
