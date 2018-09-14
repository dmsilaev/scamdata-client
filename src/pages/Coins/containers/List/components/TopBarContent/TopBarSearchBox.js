import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { computed, observable } from "mobx";

import Popover from "react-popover";
import FormInput from "Shared/form/FormInput";
import SingleSelect from "Shared/form/SingleSelect";

import TuneIcon from "react-icons/lib/md/tune";
import SortIcon from "react-icons/lib/md/sort";

@inject("searchForm", "sortForm")
@observer
class TopBarSearchBox extends Component {
  constructor(props) {
    super(props);

    this.toggleFilter = this.toggleFilter.bind(this);
    this.closeFilter = this.closeFilter.bind(this);

    this.toggleSorting = this.toggleSorting.bind(this);
    this.closeSorting = this.closeSorting.bind(this);
  }

  @observable filterIsOpenned = false;

  @observable sortIsOpenned = false;

  @computed get sortByText() {
    const { sortForm } = this.props;
    const sortBy = sortForm.$('sort_by').value;

    return sortForm.getSortByText(sortBy);
  }

  toggleFilter(e) {
    e.preventDefault();
    this.filterIsOpenned = !this.filterIsOpenned;
  }

  closeFilter() {
    this.filterIsOpenned = false;
  }

  toggleSorting(e) {
    e.preventDefault();
    this.sortIsOpenned = !this.sortIsOpenned;
  }

  closeSorting() {
    this.sortIsOpenned = false;
  }

  render() {
    const { searchForm, sortForm } = this.props;

    return (
      <div className="search-box">
        <div className="content">
          <div className="form__field search">
            <FormInput field={searchForm.$('chars')} />
          </div>
        </div>
      </div>
    );
  }
}

export default TopBarSearchBox;
