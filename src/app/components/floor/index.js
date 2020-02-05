import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import GSAP from 'react-gsap-enhancer';
import Vivus from 'vivus';
import screens from '../../../../config/models/screens';
import totems from '../../../../config/models/totems';
import sections from '../../../../config/models/sections';
import floorAnimation from './animations';
import Modal from './modal';
import Section from './section';
import labels from '../../../../config/labels';
import {
  setCurrentView,
  setOpenedSection,
  toggleSidebar,
  hideSidebar,
} from '../shared/navbar/actions';

class Floor extends Component {

  static getPositionAndSizeStyle(position, size) {
    return {
      top: `${position.top}%`,
      left: `${position.left}%`,
      width: `${size}vw`,
      height: `${size}vw`,
    };
  }

  static getPositionStyle(top, left) {
    return { top: `${top}%`, left: `${left}%` };
  }

  static getFloorByAlias(floorAlias) {
    return screens.find(({ alias }) => alias === floorAlias);
  }

  static getMarkerPositionAndStyle(position, size) {
    return {
      top: `${position.top}%`,
      left: `${position.left}%`,
      width: `${size}vw`,
    };
  }

  static getFloorMarkerByTotem(props) {
    const totem = totems.find(({ alias }) => alias === props.totem);
    if (!totem) {
      alert('No hay ningún totem con ese identificador');
      return false;
    }
    if (!totem.markers || !totem.markers.length) {
      return [];
    }
    return totem.markers.find(({ floor }) => floor === props.match.params.floor);
  }

  static getInitialState(props) {
    return {
      floor: null,
      modalShown: false,
      currentSection: false,
      floorDuration: 1.5,
      gsapAnimation: false,
      vivusDone: false,
      vivusAnimation: false,
      floorConfig: null,
      trackAnimated: false,
      marker: Floor.getFloorMarkerByTotem(props),
    };
  }

  constructor(props) {
    super(props);
    this.state = Floor.getInitialState(props);
    this.openSection = this.openSection.bind(this);
    this.closeSection = this.closeSection.bind(this);
    this.animateTrack = this.animateTrack.bind(this);
    this.setFloor = this.setFloor.bind(this);
    this.getFloorConfig = this.getFloorConfig.bind(this);
    this.resetAnimationsIfNeeded = this.resetAnimationsIfNeeded.bind(this);
    this.animationEnabled = this.animationEnabled.bind(this);
    this.goToFloor = this.goToFloor.bind(this);
  }

  componentWillMount() {
    const nextRoute = this.props.match.params;
    let section = null;
    if (nextRoute.section !== 'none') {
      section = sections.find(({ alias }) => alias === nextRoute.section);
    }
    this.setState(Floor.getInitialState(this.props), () =>
      this.setFloor(nextRoute.floor, section),
    );
    if (section) {
      this.props.setOpenedSection(section);
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentRoute = this.props.match.params;
    const nextRoute = nextProps.match.params;

    if (nextRoute.section !== currentRoute.section && nextRoute.section !== 'none') {
      const section = sections.find(({ alias }) => alias === nextRoute.section);
      this.setState(Floor.getInitialState(this.props), () =>
        this.setFloor(nextRoute.floor, section));
      this.props.setOpenedSection(section);
    } else if (nextRoute.floor !== currentRoute.floor) {
      return this.setState(Floor.getInitialState(this.props), () =>
        this.setFloor(nextRoute.floor));
    }
    return false;
  }

  getFloorConfig(floorAlias, floors = this.props.config.floors) {
    return floors.find(({ alias }) => alias === floorAlias);
  }

  setFloor(floorAlias, section = null) {
    const floor = Floor.getFloorByAlias(floorAlias);
    const floorConfig = this.getFloorConfig(floorAlias);
    this.props.setCurrentView(floor);
    this.resetAnimationsIfNeeded();

    let sectionStateProps = {};
    if (section) {
      sectionStateProps = {
        modalShown: true,
        currentSection: section,
      };
    }

    this.setState(
      Object.assign(
        Floor.getInitialState(this.props),
        sectionStateProps,
        {
          floor,
          floorConfig,
          gsapAnimation: this.addAnimation(
            animObj => floorAnimation(
              animObj,
              this.state.floorDuration,
              floor.pathDuration,
              floor.sectionsDuration,
              this.animationEnabled(),
            ),
          ),
        },
    ), () => {
      this.animateTrack(floor, floorConfig);
    });
  }

  resetAnimationsIfNeeded() {
    if (this.state.gsapAnimation) {
      this.state.gsapAnimation.restart().kill();
    }
    if (this.state.vivusAnimation) {
      this.state.vivusAnimation.reset().stop();
      document.getElementById('svg-div').innerHTML = ''; // eslint-disable-line
    }
  }

  animationEnabled() {
    return this.props.match.params.animate === 'true';
  }

  animateTrack(floor, floorConfig) {
    const animationEnabled = this.animationEnabled();
    const SVGFile = require(`../../assets/img/floor/${floor.alias}/${floorConfig.track}`);
    this.setState({
      vivusAnimation: new Vivus('svg-div', {
        duration: floor.pathDuration * 125,
        file: SVGFile,
        type: 'oneByOne',
        animTimingFunction: Vivus.EASE,
        start: 'manual',
        onReady: () => {
          if (!animationEnabled) {
            this.state.vivusAnimation.finish();
            setTimeout(() => this.setState({ vivusDone: true }), 250);
          }
        },
      }),
    }, () => {
      if (animationEnabled) {
        setTimeout(() => {
          this.setState({ vivusDone: true });
        }, 1500);
        setTimeout(() => {
          this.state.vivusAnimation.play();
        }, this.state.floorDuration * 2 * 1000);
      }
    });
  }

  openSection(section) {
    this.props.setOpenedSection(section);
    this.setState({ modalShown: true, currentSection: section });
  }

  closeSection() {
    this.setState({ modalShown: false, currentSection: {} });
    this.props.setOpenedSection({ section: false });
  }

  goToFloor(floor) {
    if (floor) {
      this.props.history.push(`/floor/${floor}/none/true/?totem=${this.props.totem}`);
    }
  }

  render() {
    const { lang, config } = this.props;
    const { floor, marker } = this.state;
    if (!floor || !floor.alias) return <div />;
    const layerImages = {
      detail: require(`../../assets/img/floor/${floor.alias}/${floor.images.detail}`),
      icons: require(`../../assets/img/floor/${floor.alias}/${floor.images.icons}`),
    };
    let configBackgroundSrc = false;
    if (config && config.backgroundImage) {
      configBackgroundSrc = require(`../../assets/img/backgrounds/${config.backgroundImage}`);
    }
    let MARKER_SRC;
    if (marker) {
      MARKER_SRC = require(`../../assets/img/general/${marker.fileName}`);
    }

    return (
      <div id="floor-container" className={`floor${floor.alias}`}>
        {/* GENERIC BACKGROUND */}
        {configBackgroundSrc ?
          <div
            className="generic-background"
            style={{ backgroundImage: `url(${configBackgroundSrc})` }}
          />
        : null}
        <div className="layers">
          {/* FLOOR */}
          <div
            className="layer"
            id="layer-floor"
            style={{ backgroundImage: `url(${layerImages.detail})` }}
          />
          {/* PATH */}
          <div className="layer" id="layer-path">
            <div
              id="svg-div"
              style={{
                width: `${this.props.device.width}px`,
                height: `${this.props.device.height}px`,
              }}
            />
          </div>
          {/* ICONS */}
          <div
            className="layer"
            id="layer-icons"
            style={{ backgroundImage: `url(${layerImages.icons})` }}
          />
          {/* QR */}
          {config && config.qr ? (
            <img
              className="layer layer-qr shown"
              id="qr-code"
              src={require(`../../assets/img/qr/${config.qr.image}`)}
              style={Floor.getPositionAndSizeStyle(config.qr.position, config.qr.size)}
            />
          ) : (
            <span
              className="layer layer-qr"
              id="qr-code"
            />
          )
          }
        </div>
        {/* SECTIONS */}
        {sections
          .filter(section => section.floor === floor.alias)
          .map((section) => {
            const thumbnail = require(`../../assets/img/sections/${section.alias}/${section.images.thumbnail}`);
            const connector = require(`../../assets/img/sections/${section.alias}/${section.images.connector}`);
            return (
              <div key={`section-${section.alias}`}>
                <Section
                  section={section}
                  openSection={this.openSection}
                  thumbnail={thumbnail}
                  lang={this.props.lang}
                />
                <img className="connector" src={connector} />
              </div>
            );
          })
        }
        {/* LABELS */}
        {this.state.floorConfig.labels && this.state.floorConfig.labels.entrance &&
        this.state.floorConfig.labels.entrance.map(({ top, left, goToFloor = null }, index) => (
          <h3
            key={`entrance-label-${index}`} // eslint-disable-line react/no-array-index-key
            className="floor-label entrance"
            style={Floor.getPositionStyle(top, left)}
            onClick={() => this.goToFloor(goToFloor)}
          >
            {labels.entrance[lang]}
          </h3>
        ))}
        {this.state.floorConfig.labels && this.state.floorConfig.labels.nextLevel &&
        this.state.floorConfig.labels.nextLevel.map(({ top, left, goToFloor = null }, index) => (
          <h3
            key={`next-level-label-${index}`} // eslint-disable-line react/no-array-index-key
            className="floor-label next-level"
            style={Floor.getPositionStyle(top, left)}
            onClick={() => this.goToFloor(goToFloor)}
          >
            {labels.nextLevel[lang]}
          </h3>
        ))}
        {/* FLOORS-LEGEND */}
        <Link to={`/home/false/false/${this.props.totem}`}>
          {screens.map(({ type, alias, images }) => {
            if (type !== 'floor') return null;
            const legendSrc = require(`../../assets/img/floor/${alias}/${images.legend}`);
            return (
              <div
                key={`screen-${alias}`}
                style={{
                  backgroundImage: `url(${legendSrc})`,
                  transition: this.animationEnabled() ? 'all 1s cubic-bezier(0.075, 0.82, 0.165, 1)' : 'all 0s',
                }}
                className={`floor-legend
                  ${images.legend
                  .replace('legend_floor', '')
                  .replace('.png', '') === floor.alias ? 'active' : ''}
                  ${this.state.animatePath ? 'shown' : ''}
                `}
              />
            );
          })}
        </Link>
        {/* MARKER */}
        {marker && (
          <img
            key={`marker-${marker.alias}`} // eslint-disable-line react/no-array-index-key
            className="layer layer-marker"
            src={MARKER_SRC}
            style={Floor.getMarkerPositionAndStyle(marker.position, marker.size)}
          />
        )}
        {/* GREY LOADING MASK */}
        <div className={`layer-grey ${!this.state.vivusDone ? 'shown' : ''}`} />
        {/* MODAL */}
        <Modal
          shown={this.state.modalShown}
          openSection={this.openSection}
          closeSection={this.closeSection}
          section={this.state.currentSection}
          lang={lang}
        />
      </div>
    );
  }
}

Floor.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  setOpenedSection: PropTypes.func.isRequired,
  device: PropTypes.number.isRequired,
  totem: PropTypes.string.isRequired,
};

const mapStateToProps = ({ navigation }) => ({
  floor: navigation.current,
  lang: navigation.language,
  config: navigation.config,
  sidebarShown: navigation.sidebarShown,
  device: navigation.device,
  totem: navigation.totem,
});

const mapDispatchToProps = dispatch => ({
  setCurrentView(floor) {
    return dispatch(setCurrentView(floor));
  },
  setOpenedSection(section) {
    return dispatch(setOpenedSection(section));
  },
  toggleSidebar: show => dispatch(toggleSidebar(show)),
  hideSidebar: () => dispatch(hideSidebar()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GSAP()(Floor)));

/* eslint-enable import/no-dynamic-require global-require */
