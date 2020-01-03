import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Temperature extends PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="current-condition">
        <div className="wrapper-temperature">
          <span className="temperature__status">{this.props.weather}</span>
        </div>
      </section>
    )
  }
}

Temperature.propTypes = {
  weather: PropTypes.string.isRequired
};

export default Temperature;