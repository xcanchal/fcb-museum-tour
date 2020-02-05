import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';


const Modal = ({ shown, lang, section, closeSection }) => (
  section && shown ?
    <div id="modal-wrap">
      <div className="dark-layer" onClick={() => closeSection()} />
      <div id="modal">
        <Slider
          arrows
          infinite
          dots
          adaptiveHeight
          prevArrow={<span />}
          nextArrow={<span />}
        >
          {!!section.story && section.story.map((chapter) => {
            const fileType = 'img';
            const MEDIAFILE_SRC = require(`../../../assets/img/sections/${section.alias}/${chapter.image}`);
            return (
              <div key={`chapter-${chapter.image}`}>
                {fileType === 'img' && <img src={MEDIAFILE_SRC} alt="" />}
                <p className="caption">{chapter.caption[lang]}</p>
              </div>
            );
          })}
        </Slider>
        <i className="close zmdi zmdi-close" onClick={() => closeSection()} />
      </div>
    </div>
  :
  null
);

Modal.propTypes = {
  closeSection: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired,
  section: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  lang: PropTypes.string.isRequired,
};

export default Modal;
