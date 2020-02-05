import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ section, openSection, thumbnail, lang }) => (
  <div
    className="floor-section"
    onClick={() => openSection(section)}
    style={{ top: `${section.position.top}%`, left: `${section.position.left}%` }}
  >
    {thumbnail &&
      <div className="thumbnail" style={{ backgroundImage: `url(${thumbnail})` }} />
    }
    <div className="text"><p>{section.texts.title[lang]}</p></div>
  </div>
);

Section.propTypes = {
  section: PropTypes.object.isRequired,
  thumbnail: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  openSection: PropTypes.func.isRequired,
};

export default Section;
