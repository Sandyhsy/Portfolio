import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import useProfile from '../hooks/useProfile';
import FallbackSpinner from './FallbackSpinner';
import '../css/timeline.css';

function MarkdownLine({ text }) {
  return (
    <ReactMarkdown components={{ p: 'span' }}>
      {text}
    </ReactMarkdown>
  );
}

MarkdownLine.propTypes = {
  text: PropTypes.string.isRequired,
};

function ResourceIcon({ href, label, children }) {
  const className = `exp-project__icon${href ? '' : ' exp-project__icon--empty'}`;
  if (!href) {
    return (
      <span className={className} aria-label={label} title={label}>
        {children}
      </span>
    );
  }
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  );
}

ResourceIcon.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path fill="currentColor" d="M10 8.8v6.4l5.4-3.2L10 8.8z" />
    </svg>
  );
}

function ProjectDropdown({ project }) {
  const [open, setOpen] = useState(false);
  const publication = project.publication;

  return (
    <div className="exp-project">
      <button
        type="button"
        className="exp-project__toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {project.name}
      </button>
      {open && (
        <div className="exp-project__panel">
          {project.details?.length > 0 && (
            <ul className="tl-list">
              {project.details.map((point) => (
                <li key={point}>
                  <MarkdownLine text={point} />
                </li>
              ))}
            </ul>
          )}
          {publication?.label && (
            <p className="exp-project__publication">
              {`${publication.prefix || 'Publication'}: `}
              {publication.href ? (
                <a href={publication.href} target="_blank" rel="noopener noreferrer">
                  {publication.label}
                </a>
              ) : publication.label}
            </p>
          )}
          {(project.github || project.video) && (
            <div className="exp-project__icons">
              {project.github && (
                <ResourceIcon href={project.github} label="GitHub">
                  <GithubIcon />
                </ResourceIcon>
              )}
              {project.video && (
                <ResourceIcon href={project.video} label="Video">
                  <VideoIcon />
                </ResourceIcon>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ProjectDropdown.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.string),
    publication: PropTypes.shape({
      prefix: PropTypes.string,
      label: PropTypes.string,
      href: PropTypes.string,
    }),
    github: PropTypes.string,
    video: PropTypes.string,
  }).isRequired,
};

function Experience(props) {
  const { header } = props;
  const payload = useProfile('experiences.json');
  const data = payload?.experiences;

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            <div className="tl tl--experience">
              {data.map((item) => (
                <div className="tl-item" key={item.title + item.dateText}>
                  <div className="tl-node--dot" />
                  <div className="tl-card">
                    <div className="tl-date">{item.dateText}</div>
                    <h3 className="tl-title">{item.title}</h3>
                    <div className="tl-subtitle">
                      <span className="accent">{item.subtitle}</span>
                      {item.workType ? ` · ${item.workType}` : ''}
                    </div>
                    {item.workDescription?.length > 0 && (
                      <ul className="tl-list">
                        {item.workDescription.map((point) => (
                          <li key={point}>
                            <MarkdownLine text={point} />
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.projects?.map((project) => (
                      <ProjectDropdown key={project.name} project={project} />
                    ))}
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

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
