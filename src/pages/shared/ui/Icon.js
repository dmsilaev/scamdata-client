import React, { PureComponent } from 'react';

export default class Icon extends PureComponent {
  render() {
    const { glyph } = this.props;

    return (
      <i className="icon">
        <svg>
          <use xlinkHref={`#${glyph}`} />
        </svg>
      </i>
    );
  }
}

Icon.defaultProps = {
  glyph: ''
};
