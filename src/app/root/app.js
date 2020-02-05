import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Routes from './routes';
import Navbar from '../components/shared/navbar/';
import Timer from '../utils/timer';
import screens from '../../../config/models/screens';
import {
  setLanguage,
  setTopBar,
  setCurrentView,
  setDeviceInfo,
  setTotem,
} from '../components/shared/navbar/actions';

/*
eslint-disable no-undef
*/

class App extends Component {

  constructor(props) {
    super(props);
    this.goToWaiting = this.goToWaiting.bind(this);
    this.timer = new Timer(this.goToWaiting);
  }

  componentWillMount() {
    this.props.setDeviceInfo(window.innerWidth);
    const totem = new URL(location.href).searchParams.get('totem');
    this.props.setTotem(totem);
  }

  componentDidMount() {
    if (!this.props.location.pathname.includes('/waiting')) {
      this.timer.run(this.props.videoStatus);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.videoStatus) {
      this.timer.run(nextProps.videoStatus);
    }
  }

  goToWaiting() {
    const waiting = screens.find(({ alias }) => alias === 'waiting');
    this.props.setCurrentView(waiting);
    this.props.history.push(`/waiting/?totem=${this.props.totem}`);
  }

  render() {
    const { videoStatus, persistLang, persistTopBar } = this.props;
    return (
      <div onClick={() => this.timer.run(videoStatus)}>
        <Routes />
        <Navbar persistLang={persistLang} persistTopBar={persistTopBar} />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  videoStatus: PropTypes.string.isRequired,
  persistLang: PropTypes.func.isRequired,
  persistTopBar: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setDeviceInfo: PropTypes.func.isRequired,
  setTotem: PropTypes.func.isRequired,
  totem: PropTypes.string.isRequired,
};

const mapStateToProps = ({ navigation }) => ({
  videoStatus: navigation.videoStatus,
  language: navigation.language,
  topBar: navigation.topBar,
  totem: navigation.totem,
});

const mapDispatchToProps = dispatch => ({
  persistLang: lang => dispatch(setLanguage(lang)),
  persistTopBar: active => dispatch(setTopBar(active)),
  setCurrentView: floor => dispatch(setCurrentView(floor)),
  setDeviceInfo: width => dispatch(setDeviceInfo(width)),
  setTotem: totem => dispatch(setTotem(totem)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

/*
eslint-enable no-undef
*/
