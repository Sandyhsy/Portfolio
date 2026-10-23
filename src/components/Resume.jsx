import React from 'react';
import PropTypes from 'prop-types';
import useProfile from '../hooks/useProfile';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/resume.css';

function Resume(props) {
  const { header } = props;
  const data = useProfile('resume.json');

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container resume">
          <a className="btn-pill btn-accent resume__download" href={data.src} download>
            {data.downloadLabel}
          </a>
          <iframe
            className="resume__frame"
            title={header}
            src={data.src}
          />
        </div>
      ) : <FallbackSpinner />}
    </>
  );
}

Resume.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Resume;
