import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import useProfile from '../hooks/useProfile';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/timeline.css';

function Transcript({ transcript }) {
  const [open, setOpen] = useState(false);
  if (!transcript?.src) return null;

  return (
    <div className="transcript">
      <button
        type="button"
        className="transcript__toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {transcript.label}
      </button>
      {open && (
        <div className="transcript__panel">
          <iframe
            className="transcript__frame"
            title={transcript.label}
            src={transcript.src}
          />
          <a className="btn-pill btn-ghost transcript__download" href={transcript.src} download>
            {transcript.downloadLabel}
          </a>
        </div>
      )}
    </div>
  );
}

Transcript.propTypes = {
  transcript: PropTypes.shape({
    src: PropTypes.string,
    label: PropTypes.string,
    downloadLabel: PropTypes.string,
  }),
};

function Education(props) {
  const { header } = props;
  const data = useProfile('education.json');

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            <div className="tl tl--education">
              {data.education?.map((item) => (
                <div className="tl-item" key={item.cardTitle + item.title}>
                  <div className="tl-node--icon">
                    {item.icon && (
                      <img src={item.icon.src} alt={item.icon.alt} />
                    )}
                  </div>
                  <div className="tl-card">
                    <div className="tl-date">{item.title}</div>
                    <h3 className="tl-title">{item.cardTitle}</h3>
                    <div className="tl-subtitle">
                      <span className="accent">{item.cardSubtitle}</span>
                    </div>
                    {item.cardDetailedText && (
                      <div className="tl-detail">{item.cardDetailedText}</div>
                    )}
                    <Transcript transcript={item.transcript} />
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      ) : <FallbackSpinner /> }
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
