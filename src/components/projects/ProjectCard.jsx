import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

function ResourceIcon({ href, label, children }) {
  const className = `project-card__icon${href ? '' : ' project-card__icon--empty'}`;
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

function PaperIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm6 1.5V9h4.5L13 4.5zM8.5 12h7v1.4h-7V12zm0 3h7v1.4h-7V15zm0 3h4.5v1.4H8.5V18z"
      />
    </svg>
  );
}

const ProjectCard = ({ project }) => {
  const parseBodyText = (text) => <ReactMarkdown>{text}</ReactMarkdown>;

  return (
    <article className="tile tile--interactive project-card">
      {project?.image && (
        <div className="project-card__media">
          <img src={project.image} alt={project.title} />
        </div>
      )}

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <div className="project-card__text">{parseBodyText(project.bodyText)}</div>
      </div>

      <div className="project-card__footer">
        {(project.github || project.video || project.paper) && (
          <div className="project-card__icons">
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
            {project.paper && (
              <ResourceIcon href={project.paper} label="Paper">
                <PaperIcon />
              </ResourceIcon>
            )}
          </div>
        )}
        {project?.tags?.length > 0 && (
          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    github: PropTypes.string,
    video: PropTypes.string,
    paper: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
