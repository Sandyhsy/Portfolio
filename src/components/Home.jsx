import React, { useContext, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Typewriter from 'typewriter-effect';
import { Fade } from 'react-awesome-reveal';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../AppContext';
import useProfile from '../hooks/useProfile';
import Social from './Social';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/home.css';
import '../css/about.css';

function Home() {
  const { language } = useContext(AppContext);
  const location = useLocation();
  const data = useProfile('home.json');
  const about = useProfile('about.json');

  useEffect(() => {
    if (location.hash !== '#about') return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, about]);

  return data ? (
    <Fade triggerOnce className="home-fade-container">
      <section className="hero">
        <div className="bento">
          <div className="tile hero-intro">
            {data?.status && (
              <span className="hero-eyebrow">{data.status}</span>
            )}
            <h1 className="hero-name">{data?.name}</h1>
            <div className="hero-roles">
              <span>{data?.rolePrefix}&nbsp;</span>
              <Typewriter
                key={language.value}
                options={{
                  loop: true,
                  autoStart: true,
                  strings: data?.roles,
                }}
              />
            </div>
            {data?.tagline && <p className="hero-tagline">{data.tagline}</p>}
            <div className="hero-cta">
              <Link className="btn-pill btn-accent" to="/projects">
                {data?.ctaWork}
              </Link>
              <Link className="btn-pill btn-ghost" to="/#about">
                {data?.ctaAbout}
              </Link>
            </div>
          </div>

          <div className="tile tile--accent hero-social">
            <span className="tile-label">{data?.findMe}</span>
            <Social />
          </div>
        </div>
      </section>

      <section className="home-about" id="about">
        <Header title={data.aboutHeading} />
        <div className="home-about__body">
          {about ? (
            <div className="bento">
              <div className="tile about-bio-tile">
                <ReactMarkdown>{about.about}</ReactMarkdown>
              </div>
              {about.imageSource && (
                <div className="tile about-image-tile">
                  <img src={about.imageSource} alt={data.name} />
                </div>
              )}
            </div>
          ) : <FallbackSpinner />}
        </div>
      </section>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
