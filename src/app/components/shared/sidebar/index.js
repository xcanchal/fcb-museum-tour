import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sections from '../../../../../config/models/sections';
import { hideSidebar } from '../navbar/actions';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {};
    this.openSection = this.openSection.bind(this);
    this.getEnabledSections = this.getEnabledSections.bind(this);
  }

  getEnabledSections() {
    const {
      config: { disabledSidebarSections = [] },
    } = this.props;
    return sections.filter(({ alias }) =>
      !disabledSidebarSections.includes(alias));
  }

  openSection(floor, alias) {
    this.props.history.push(`/floor/${floor}/${alias}/false/?totem=${this.props.totem}`);
  }

  render() {
    return (
      <div
        id="sidebar-wrap"
        className={`${this.props.shown ? 'shown' : ''} ${this.props.topBar ? 'top-bar' : ''}`}
        onClick={() => this.props.toggleSidebar(false)}
      >
        <div
          id="sidebar"
          className={this.props.shown ? 'shown' : ''}
          style={{ bottom: this.props.bottomPos }}
        >
          <div className="scroll-content">
            <ul className="list">
              {this.getEnabledSections().map(({ floor, alias, texts }) => (
                <li
                  className="list-item"
                  onClick={() => {
                    this.props.hideSidebar();
                    setTimeout(() => {
                      this.openSection(floor, alias);
                    }, 200);
                  }}
                  key={`item-${floor}-${alias}`}
                >
                  {texts.title[this.props.lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  shown: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  topBar: PropTypes.bool,
  bottomPos: PropTypes.string.isRequired,
  totem: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
  shown: false,
};

const mapStateToProps = ({ navigation }) => ({
  alias: navigation.current.alias,
  config: navigation.config,
  enabledFloors: navigation.enabledFloors,
  totem: navigation.totem,
});

const mapDispatchToProps = dispatch => ({
  hideSidebar: () => dispatch(hideSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
