import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setLanguage } from '../../shared/navbar/actions';
import { languages } from '../../../../../config/general';

const getTopbarSize = deviceWidth => ({
  width: `${deviceWidth}px`,
  height: `${deviceWidth / 17}px`,
});

const TopBar = (props) => {
  let TOPBAR_IMG = '';
  if (props.config && props.config.topbarImage) {
    TOPBAR_IMG = require(`../../../assets/img/topbar/${props.config.topbarImage}`);
  }
  return (
    <div className="topbar" style={getTopbarSize(props.deviceWidth)}>
      {/* TOPBAR IMG */}
      <div style={{ backgroundImage: `url(${TOPBAR_IMG})` }} className="topbar-img" />
      <div
        className="logo-link"
        onClick={() =>
          props.history.push(`/home/false/false/?totem=${props.totem}`)
        }
      />
      {/* LANGUAGES */}
      <ul className="flags-menu">
        {languages.map((lang) => {
          const flagIcon = require(`../../../assets/img/topbar/flags/flag_${lang}.png`);
          return (
            <li key={lang} onClick={() => props.setLanguage(lang)}>
              <img className="flag" src={flagIcon} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TopBar.propTypes = {
  config: PropTypes.object.isRequired,
  deviceWidth: PropTypes.number.isRequired,
  totem: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ navigation }) => ({
  config: navigation.config,
  deviceWidth: navigation.device.width,
  totem: navigation.totem,
});

const mapDispatchToProps = dispatch => ({
  setLanguage(language) {
    return dispatch(setLanguage(language));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
