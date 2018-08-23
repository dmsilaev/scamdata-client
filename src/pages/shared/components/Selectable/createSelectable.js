import React from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';

const createSelectable = (WrappedComponent) => {
  class SelectableItem extends React.Component {

    componentDidMount () {
      this.props.registryStore.register(this.props.selectableKey, ReactDOM.findDOMNode(this));
    }


    componentWillUnmount () {
      this.props.registryStore.unregister(this.props.selectableKey);
    }


    render () {
      return React.createElement(
        WrappedComponent,
        this.props,
        this.props.children
      );
    }
  }

  SelectableItem.propTypes = {
    selectableKey: PropTypes.any.isRequired,
    registryStore: PropTypes.object.isRequired
  };

  return SelectableItem;
}


export default createSelectable;
