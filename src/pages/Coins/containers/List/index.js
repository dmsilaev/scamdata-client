import React, { Component } from "react";
import PropTypes from "prop-types"
import { observer, inject, Provider } from "mobx-react";
import { autorun, observable } from "mobx";
import { withRouter, Switch, Route } from "react-router-dom";

import TopBar from "Shared/components/TopBar";
import TopBarContent from "./components/TopBarContent";
import PageContent from "./components/PageContent";

import searchForm from "./components/SearchForm";
import filterForm from "./components/FilterForm";
import sortForm from "./components/SortForm";
import CoinsStore from "Stores/CoinsStore";

@withRouter
@observer
class List extends Component {

  componentWillMount() {
    const { coinsStore } = this.props;

    this.formUpdater = autorun(() => {
      coinsStore.fetch();
    })
  }

  componentWillUnmount() {
    const { ordersStore } = this.props;
    ordersStore.clear();
    this.formUpdater();
  }


  render() {
    const { coinsStore, searchForm, sortForm } = this.props;

    return (
      <Provider
        coinsStore={coinsStore.coins && coinsStore}
        searchForm={searchForm}
        sortForm={sortForm}
        filterForm={filterForm}
      >
        <div className="layout__page">
          <TopBar content={TopBarContent} />
          <div className="layout__page-content">
            <PageContent/>
          </div>
        </div>
      </Provider>
    );
  }
}

List.defaultProps = {
  coinsStore: CoinsStore.create(),
  searchForm: searchForm,
  sortForm: sortForm,
  filterForm: filterForm
}

export default List;
