import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentView, updateVideoStatus } from '../shared/navbar/actions';
import screens from '../../../../config/models/screens';
import Controls from './video-player/controls';
import { languages } from '../../../../config/general';


const captionsSrc = require('./video-captions.vtt');

const INITIAL_STATE = {
  touched: false,
  paused: false,
  playing: false,
  chapterIndex: 0,
};


class MustSee extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.onVideoEnd = this.onVideoEnd.bind(this);
    this.timeUpdated = this.timeUpdated.bind(this);
    this.goToBreakpoint = this.goToBreakpoint.bind(this);
    this.resetVideo = this.resetVideo.bind(this);
    this.prevPoint = this.prevPoint.bind(this);
    this.nextPoint = this.nextPoint.bind(this);
    this.isFirstPoint = this.isFirstPoint.bind(this);
    this.isLastPoint = this.isLastPoint.bind(this);
    this.getChapterImage = this.getChapterImage.bind(this);
  }

  componentWillMount() {
    const mustSee = screens.find(({ alias }) => alias === 'must_see');
    this.props.setCurrentView(mustSee);
    this.resetVideo(mustSee);
  }

  componentDidMount() {
    setTimeout(() => {
      const { video } = screens.find(({ alias }) => alias === 'must_see');
      if (video && video.autoStart) {
        this.playVideo();
      }
    }, 200);
  }

  onVideoEnd() {
    this.props.updateVideoStatus('stopped');
    this.resetVideo(this.props.mustSee);
  }

  playVideo() {
    if (!this.state.playing) {
      this.video.play();
      this.setState({ playing: true, touched: true });
      this.props.updateVideoStatus('playing');
    }
  }

  pauseVideo() {
    if (this.state.playing) {
      this.video.pause();
      this.setState({ playing: false, paused: true });
      this.props.updateVideoStatus('paused');
    }
  }

  timeUpdated() {
    // const breakpoint = MustSee.timeToBreakpoint(this.video.currentTime);
    const breakpoint = parseInt(this.video.currentTime, 10);
    const chapterIndex = this.props.mustSee.video.chapters.findIndex(
      chapter => chapter.breakpoint === breakpoint,
    );
    if (this.state.breakPoints.includes(breakpoint)) {
      this.setState({ currentBreakpoint: breakpoint, chapterIndex });
    }
  }

  goToBreakpoint(breakpoint) {
    // this.video.currentTime = MustSee.breakPointToTime(breakpoint);
    this.video.currentTime = breakpoint;
    const chapterIndex = this.props.mustSee.video.chapters.findIndex(
      chapter => chapter.breakpoint === breakpoint,
    );
    this.setState({
      currentBreakpoint: breakpoint,
      chapterIndex,
    });
  }

  resetVideo(mustSee) {
    this.setState(Object.assign(INITIAL_STATE, {
      // eslint-disable-next-line
      videoSrc: require(`../../assets/video/${mustSee.video.src}`),
      breakPoints: mustSee.video.chapters.map(({ breakpoint }) => breakpoint),
      currentBreakpoint: mustSee.video.chapters[0].breakpoint,
    }));
  }

  prevPoint() {
    const { breakPoints, currentBreakpoint: current } = this.state;
    const prevIndex = breakPoints.findIndex(breakpoint => current === breakpoint) - 1;
    if (prevIndex >= 0) {
      this.goToBreakpoint(breakPoints[prevIndex]);
    }
  }

  nextPoint() {
    const { breakPoints, currentBreakpoint: current } = this.state;
    const nextIndex = breakPoints.findIndex(breakpoint => current === breakpoint) + 1;
    if (nextIndex < this.state.breakPoints.length) {
      this.goToBreakpoint(breakPoints[nextIndex]);
    }
  }

  isFirstPoint(breakpoint) {
    return breakpoint === this.state.breakPoints[0];
  }

  isLastPoint(breakpoint) {
    return breakpoint === this.state.breakPoints[this.state.breakPoints.length - 1];
  }

  getChapterImage() {
    return this.props.mustSee.video.chapters[this.state.chapterIndex].legendImage;
  }

  render() {
    if (!this.props.mustSee.alias || this.props.mustSee.alias !== 'must_see') return <div />;
    const { mustSee, lang, config } = this.props;
    let configBackgroundSrc = false;
    if (config && config.backgroundImage) {
      configBackgroundSrc = require(`../../assets/img/backgrounds/${config.backgroundImage}`);
    }
    const legendBaseImage = require(`../../assets/img/must-see/${mustSee.legendBaseImage}`);
    let chapterImage = null;
    if (this.state.playing) {
      chapterImage = require(`../../assets/img/must-see/${this.getChapterImage()}`);
    }

    return (
      <div id="must-see-container">
        {/* GENERIC BACKGROUND */}
        {configBackgroundSrc ?
          <div
            className="generic-background"
            style={{ backgroundImage: `url(${configBackgroundSrc})` }}
          />
        : null}
        <div className="legend">
          <div
            className="legend-base"
            style={{ backgroundImage: `url(${legendBaseImage})` }}
          />
          {this.state.playing && (
            <div
              className="legend-chapter"
              style={{ backgroundImage: `url(${chapterImage})` }}
            />
          )}
        </div>
        <div className="col col__left">
          <div className="video-wrap">
            <video
              // eslint-disable-next-line
              ref={ref => this.video = ref}
              id="video"
              autoPlay=""
              loop=""
              // muted=""
              width="100%"
              onEnded={() => this.onVideoEnd()}
              onTimeUpdate={() => this.timeUpdated()}
            >
              <source type="video/mp4" src={this.state.videoSrc} />
              <track src={captionsSrc} kind="captions" srcLang="en" label="English" />
            </video>
            {!this.state.touched && !this.state.playing ?
              <i
                className="play-big zmdi zmdi-play-circle-outline"
                onClick={() => this.playVideo()}
              />
              :
              <div className="chapter-list">
                {mustSee.video.chapters.map(({ breakpoint, title, description }, index) => (
                  <div
                    className={`chapter ${this.state.currentBreakpoint === breakpoint ? 'active' : ''}`}
                    onClick={() => this.goToBreakpoint(breakpoint)}
                    key={`chapter_${index}`}
                  >
                    <div className="left">
                      <h1 className="number">{index + 1}</h1>
                    </div>
                    <div className="right">
                      <h2 className="title">{title[lang]}</h2>
                      <p className="subtitle">{description[lang]}</p>
                    </div>
                  </div>
              ))}
              </div>
              }
          </div>
          <div className="video-below">
            {!this.state.touched ?
              <p className="video-caption">{mustSee.texts.video[lang]}</p>
              :
              <Controls
                videoState={this.state}
                playVideo={this.playVideo}
                pauseVideo={this.pauseVideo}
                prevPoint={this.prevPoint}
                nextPoint={this.nextPoint}
                isFirstPoint={this.isFirstPoint}
                isLastPoint={this.isLastPoint}
              />}
          </div>
        </div>
      </div>
    );
  }
}

MustSee.propTypes = {
  mustSee: PropTypes.object,
  setCurrentView: PropTypes.func,
  lang: PropTypes.oneOf(languages),
  config: PropTypes.object.isRequired,
  updateVideoStatus: PropTypes.func.isRequired,
};

const mapStateToProps = ({ navigation }) => ({
  mustSee: navigation.current,
  lang: navigation.language,
  config: navigation.config,
});

const mapDispatchToProps = dispatch => ({
  setCurrentView(mustSee) {
    return dispatch(setCurrentView(mustSee));
  },
  updateVideoStatus(videoStatus) {
    return dispatch(updateVideoStatus(videoStatus));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MustSee);
