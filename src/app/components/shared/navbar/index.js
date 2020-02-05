import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../sidebar';
import TopBar from '../topbar/topbar';
import { toggleSidebar, setConfig, setLanguage, setTopBar } from './actions';
import labels from '../../../../../config/labels';
import { languages } from '../../../../../config/general';
import Calendar from '../../../utils/calendar';

class Navbar extends Component {

  static getTexts(current, openedSection = {}, lang) {
    const source = openedSection.alias && current.type === 'floor' ? openedSection : current;
    return {
      title: source.texts.title[lang],
      subtitle: source.texts.subtitle[lang].map(part => <span key={part}>{part}</span>),
    };
  }

  static getSize(deviceWidth) {
    return {
      width: `${deviceWidth}px`,
      height: `${deviceWidth / 15}px`,
    };
  }

  constructor(props) {
    super(props);
    this.state = { config: props.config || null };
    this.calendar = new Calendar();
    this.getMustSeeFromConfig = this.getMustSeeFromConfig.bind(this);
    this.checkLanguageParam = this.checkLanguageParam.bind(this);
    this.loadCalendarConfig = this.loadCalendarConfig.bind(this);
  }

  componentWillMount() {
    this.checkLanguageParam();
    this.loadCalendarConfig();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.current.alias !== nextProps.current.alias) {
      if (this.props.sidebarShown) this.props.toggleSidebar(false);
    }
    if (!this.state.config && this.props.config) {
      this.setState({ config: this.props.config });
    }
  }

  getMustSeeFromConfig() {
    return this.state.config && this.state.config.mustSee ? (
      <div className="btn-wrap">
        <Link to={`/must-see/${this.props.totem}`} className="btn-element">
          <span>{labels.mustSee[this.props.lang]}</span>
          <i className="element-icon zmdi zmdi-chevron-right" />
        </Link>
      </div>)
    : null;
  }

  loadCalendarConfig() {
    const events = this.calendar.getParsedEvents();
    if (!events.length) {
      return true;
    }
    let config = 'default';
    let match = false;
    const today = Math.floor(new Date().getTime() / 1000); // unix not millisec
    events.forEach(({ start, end, summary }) => {
      if (!match && (start < today && today < end)) {
        config = summary;
        match = true;
      }
    });
    return this.props.setConfig(config);
  }

  checkLanguageParam() {
    const params = this.props.location.pathname.split('/');
    if (params.some(param => languages.includes(param))) {
      return this.props.persistLang(params[params.length - 1]);
    }
    return this.props.persistTopBar(true);
  }

  render() {
    const { current, lang, openedSection } = this.props;
    if (!current.alias || current.alias === 'waiting' || !this.state.config) return <div />;
    const texts = Navbar.getTexts(current, openedSection, lang);
    let navbarImageSrc = '';
    if (this.state.config && this.state.config.navbarImage) {
      navbarImageSrc = require(`../../../assets/img/navbar/${this.state.config.navbarImage}`);
    }

    return (
      <div id="navbar-layer">
        <div id="navbar" style={Navbar.getSize(this.props.deviceWidth)}>
          <div className="navbar-img" style={{ backgroundImage: `url(${navbarImageSrc})` }} />
          {/* LEFT SIDE */}
          <div className="col col__left">
            {current && current.alias !== 'must_see' &&
              <div className="btn-wrap">
                <div className="btn-element" onClick={() => this.props.toggleSidebar()}>
                  <span>{labels.search[lang]}</span>
                  <i className="element-icon zmdi zmdi-chevron-right" />
                </div>
              </div>
            }
          </div>
          {/* CENTER SIDE */}
          <div className="col col__center">
            <h1 className="title">{texts.title}</h1>
            <p className="subtitle">{texts.subtitle}</p>
          </div>
          {/* RIGHT SIDE */}
          <div className="col col__right">
            {current && current.alias !== 'must_see' ?
            this.getMustSeeFromConfig()
              :
            (<div className="btn-wrap">
              <Link to={`/home/false/false/${this.props.totem}`} className="btn-element">
                <span>{labels.home[this.props.lang]}</span>
                <i className="element-icon zmdi zmdi-chevron-right" />
              </Link>
            </div>)}
          </div>
        </div>
        {/* SIDEBAR */}
        <Sidebar
          shown={this.props.sidebarShown}
          toggleSidebar={this.props.toggleSidebar}
          history={this.props.history}
          lang={this.props.lang}
          bottomPos={`${this.props.deviceWidth / 15}px`}
        />
        {/* TOPBAR */}
        {this.props.activeTopBar && (
          <TopBar />
        )}
      </div>
    );
  }
}

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired,
  openedSection: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func,
  sidebarShown: PropTypes.bool.isRequired,
  lang: PropTypes.oneOf(languages).isRequired,
  setConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  activeTopBar: PropTypes.bool.isRequired,
  persistLang: PropTypes.func.isRequired,
  persistTopBar: PropTypes.func.isRequired,
  totem: PropTypes.string.isRequired,
};
Navbar.defaultProps = {
  toggleSidebar: () => null,
};

const mapStateToProps = ({ navigation }) => ({
  current: navigation.current,
  sidebarShown: navigation.sidebarShown,
  lang: navigation.language,
  config: navigation.config,
  openedSection: navigation.openedSection,
  activeTopBar: navigation.topBar === true,
  deviceWidth: navigation.device.width,
  totem: navigation.totem,
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar() {
    return dispatch(toggleSidebar());
  },
  setConfig(alias) {
    return dispatch(setConfig(alias));
  },
  setLanguage(language) {
    return dispatch(setLanguage(language));
  },
  setTopBar(language) {
    return dispatch(setTopBar(language));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));

