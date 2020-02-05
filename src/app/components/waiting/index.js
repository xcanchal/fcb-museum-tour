import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentView } from '../shared/navbar/actions';
import screens from '../../../../config/models/screens';
import { videoMask } from '../../../../config/general';

class Waiting extends Component {

  componentWillMount() {
    const waiting = screens.find(({ alias }) => alias === 'waiting');
    this.props.setCurrentView(waiting);
  }

  render() {
    if (!this.props.waiting || !this.props.waiting.alias) return <div />;
    const videoSrc = require(`../../assets/video/${this.props.waiting.video}`);
    return (
      <div id="waiting-container">
        <Link to={`/home/true/true/${this.props.totem}`} className="link">
          <video
            className={`video ${videoMask ? 'grayscale' : ''}`}
            autoPlay="autoplay"
            loop="loop"
            width="100%"
            muted="muted"
          >
            <source type="video/mp4" src={videoSrc} />
            {/* <track src={captionsSrc} kind="captions" srcLang="en" label="English" /> */}
          </video>
          {videoMask && <div className="gradient" />}
        </Link>
      </div>
    );
  }
}

Waiting.propTypes = {
  waiting: PropTypes.object,
  setCurrentView: PropTypes.func.isRequired,
  totem: PropTypes.string.isRequired,
};

Waiting.defaultProps = {
  waiting: {},
};

const mapStateToProps = ({ navigation }) => ({
  waiting: navigation.current,
  totem: navigation.totem,
});

const mapDispatchToProps = dispatch => ({
  setCurrentView(floor) {
    return dispatch(setCurrentView(floor));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Waiting));
