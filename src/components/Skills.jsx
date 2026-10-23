import React from 'react';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import useProfile from '../hooks/useProfile';
import FallbackSpinner from './FallbackSpinner';
import '../css/skills.css';

function Skills(props) {
  const { header } = props;
  const data = useProfile('skills.json');

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            <div className="bento">
              {data.intro && (
                <p className="skills-intro span-6">{data.intro}</p>
              )}
              {data.skills?.map((category) => (
                <div
                  key={category.title}
                  className="tile tile--interactive skill-category-tile span-3"
                >
                  <h3 className="skill-category-title">
                    {category.icon && (
                      <img src={category.icon} alt="" />
                    )}
                    {category.title}
                  </h3>
                  <div className="skill-grid">
                    {category.items.map((item) => (
                      <div key={item.title} className="skill-item">
                        {item.icon && (
                          <img src={item.icon} alt="" />
                        )}
                        <span>{item.title}</span>
                      </div>
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

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
