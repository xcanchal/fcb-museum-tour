import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GSAP from 'react-gsap-enhancer';
import Vivus from 'vivus';
import screens from '../../../../config/models/screens';
import totems from '../../../../config/models/totems';
import { setCurrentView } from '../shared/navbar/actions';
import homeAppear from './animations';
import { languages } from '../../../../config/general';

class Home extends Component {
  static getPositionAndSizeStyle(position, size) {
    return {
      top: `${position.top}%`,
      left: `${position.left}%`,
      width: `${size}vw`,
      height: `${size}vw`,
    };
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
    return totem.markers.find(({ floor }) => floor === 'home');
  }

  constructor(props) {
    super(props);
    this.state = {
      home: null,
      homeConfig: null,
      vivusAnimation: false,
      vivusDone: false,
      modalShown: false,
      marker: Home.getFloorMarkerByTotem(props),
    };
    this.animateTrack = this.animateTrack.bind(this);
    this.isDisabledFloor = this.isDisabledFloor.bind(this);
    this.isDisabledFloorByImage = this.isDisabledFloorByImage.bind(this);
    this.animationEnabled = this.animationEnabled.bind(this);
  }

  componentWillMount() {
    const { config, match } = this.props;
    const home = screens.find(({ alias }) => alias === 'home');
    const homeConfig = config.floors.find(({ alias }) => alias === 'home');
    const modalShown = match.params.modal === 'true';
    this.setState({ home, homeConfig, modalShown }, () => {
      this.props.setCurrentView(home);
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.addAnimation(() => homeAppear(this.animationEnabled()));
      this.animateTrack();
    }, 500);
  }

  componentWillUnmount() {
    if (this.state.vivusAnimation) {
      this.state.vivusAnimation.destroy();
    }
  }

  isDisabledFloor(floorAlias) {
    if (!this.props.disabledFloors.length) {
      return false;
    }
    return this.props.disabledFloors.includes(parseInt(floorAlias, 10));
  }

  animateTrack() {
    const { homeConfig } = this.state;
    const animationEnabled = this.animationEnabled();
    const SVGFile = require(`../../assets/img/home/${homeConfig.track}`);
    if (this.state.vivusAnimation) {
      this.state.vivusAnimation.play();
    } else {
      this.setState({
        vivusAnimation: new Vivus('svg-div', {
          duration: 600,
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
          }, 3000);
        }
      });
    }
  }

  isDisabledFloorByImage(img) {
    const alias = img.split('_')[1].split('.')[0].replace('floor', '');
    return this.isDisabledFloor(alias);
  }

  animationEnabled() {
    return this.props.match.params.animate === 'true';
  }

  render() {
    if (!this.state.home || !this.state.home.alias) return <div />;
    const { config } = this.props;
    const { marker } = this.state;
    let configBackgroundSrc = false;
    if (config && config.backgroundImage) {
      configBackgroundSrc = require(`../../assets/img/backgrounds/${config.backgroundImage}`);
    }
    const HOME_ICONS = require('../../assets/img/home/home_icons.png');
    const MODAL_IMAGE_SRC = require(`../../assets/img/home/${config.homeModalImage}`);
    let MARKER_SRC = null;
    if (marker) {
      MARKER_SRC = require(`../../assets/img/general/${marker.fileName}`);
    }

    return (
      <div>
        {/* GENERIC BACKGROUND */}
        {configBackgroundSrc ?
          <div
            className="generic-background"
            style={{ backgroundImage: `url(${configBackgroundSrc})` }}
          />
        : null}
        <div id="home-container">
          {/* STADIUM AND FLOORS */}
          <div id="stadium" />
          {this.state.home.images.floors.map((img) => {
            if (!img.includes('stadium')) {
              const floorSrc = require(`../../assets/img/home/${img}`);
              return (
                <div
                  key={floorSrc}
                  className={
                    `${this.isDisabledFloorByImage(img) ?
                    'home-floor-disabled' :
                    'home-floor'}`
                  }
                  style={{ backgroundImage: `url(${floorSrc})` }}
                />
              );
            }
            return null;
          })}
          {/* PATH */}
          <div className="layer layer-path" id="layer-path">
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
            className="layer layer-icons"
            id="layer-icons"
            style={{ backgroundImage: `url(${HOME_ICONS})`, backgroundSize: '100% auto' }}
          />
          {/* MARKER */}
          {MARKER_SRC && (
            <img
              key={`marker-${marker.alias}`} // eslint-disable-line react/no-array-index-key
              className="layer layer-marker"
              src={MARKER_SRC}
              style={Home.getMarkerPositionAndStyle(marker.position, marker.size)}
            />
          )}
          {/* QR */}
          {config && config.qr ? (
            <img
              className="layer layer-qr shown"
              id="qr-code"
              src={require(`../../assets/img/qr/${config.qr.image}`)}
              style={Home.getPositionAndSizeStyle(config.qr.position, config.qr.size)}
            />
          ) : (
            <span
              className="layer layer-qr"
              id="qr-code"
            />
          )
          }
          {/* FLOOR-BUTTONS */}
          <ul className="home-menu">
            {screens.map(({ type, alias, texts }) => {
              if (type !== 'floor') return null;
              const alignRight = parseInt(alias, 10) > 0;
              return (
                <li
                  className={`home-btn-wrap ${alignRight ? 'align-right' : 'align-left'}`}
                  key={`floor-${alias}`}
                >
                  <Link
                    to={`/floor/${alias}/none/true/${this.props.totem}`}
                    className={`${this.isDisabledFloor(alias) ? 'home-btn-disabled' : 'home-btn'}`}
                  >
                    <div className="btn-text">
                      <h3 className="title">{texts.title[this.props.lang]}</h3>
                      <p className="subtitle">{texts.button[this.props.lang]}</p>
                    </div>
                    <span className={`btn-icon zmdi ${alignRight ? 'zmdi-chevron-right' : 'zmdi-chevron-left'}`} />
                  </Link>
                </li>
              );
            }).reverse()}
          </ul>
          {/* GREY LOADING MASK */}
          <div className={`layer-grey ${!this.state.vivusDone ? 'shown' : ''}`} />
          {/* MODAL */}
          {this.props.match.params.modal && this.state.modalShown && (
            <div className="img-modal-wrapper">
              <div className="bg" onClick={() => this.setState({ modalShown: false })} />
              <div className="image-wrap">
                <img src={MODAL_IMAGE_SRC} className="image" />
                <i
                  className="close zmdi zmdi-close"
                  onClick={() => this.setState({ modalShown: false })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
  lang: PropTypes.oneOf(languages).isRequired,
  config: PropTypes.object.isRequired,
  disabledFloors: PropTypes.array,
  device: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  totem: PropTypes.string.isRequired,
};

Home.defaultProps = {
  disabledFloors: [],
};

const mapStateToProps = ({ navigation }) => ({
  lang: navigation.language,
  config: navigation.config,
  disabledFloors: navigation.config.disabledFloors,
  device: navigation.device,
  totem: navigation.totem,
});

const mapDispatchToProps = dispatch => ({
  setCurrentView(home) {
    return dispatch(setCurrentView(home));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GSAP()(Home));

