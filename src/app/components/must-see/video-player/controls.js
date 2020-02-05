import React from 'react';
import PropTypes from 'prop-types';

const Controls = props => (
  <div className="control-bar">
    <ul>
      <li
        className={`controls rewind ${props.isFirstPoint(props.videoState.currentBreakpoint) ? 'disabled' : ''}`}
        onClick={() => props.prevPoint()}
      >
        <i className="zmdi zmdi-skip-previous" />
      </li>
      <li
        className={`controls pause ${!props.videoState.playing && props.videoState.paused && 'active'}`}
        onClick={() => props.pauseVideo()}
      >
        <i className="zmdi zmdi-pause" />
      </li>
      <li
        className={`controls play ${!!props.videoState.playing && 'active'}`}
        onClick={() => props.playVideo()}
      >
        <i className="zmdi zmdi-play" />
      </li>
      <li
        className={`controls forward ${props.isLastPoint(props.videoState.currentBreakpoint) ? 'disabled' : ''}`}
        onClick={() => props.nextPoint()}
      >
        <i className="zmdi zmdi-skip-next" />
      </li>
    </ul>
  </div>
);

Controls.propTypes = {
  videoState: PropTypes.object.isRequired,
  playVideo: PropTypes.func.isRequired,
  pauseVideo: PropTypes.func.isRequired,
  prevPoint: PropTypes.func.isRequired,
  nextPoint: PropTypes.func.isRequired,
  isFirstPoint: PropTypes.func.isRequired,
  isLastPoint: PropTypes.func.isRequired,
};

export default Controls;
