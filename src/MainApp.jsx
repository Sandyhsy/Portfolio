import React, { Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AppContext from './AppContext';
import useProfile from './hooks/useProfile';

const sections = {
  Skills: React.lazy(() => import('./components/Skills.jsx')),
  Education: React.lazy(() => import('./components/Education.jsx')),
  Experience: React.lazy(() => import('./components/Experience.jsx')),
  Projects: React.lazy(() => import('./components/Projects.jsx')),
  Resume: React.lazy(() => import('./components/Resume.jsx')),
};

function Footer() {
  const { language } = useContext(AppContext);
  const lead = language.value === 'zh' ? '版面模板來自' : 'Template by';

  return (
    <footer className="site-footer">
      {lead}
      {' '}
      <a
        href="https://github.com/mayankagarwal09/dev-portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        Mayank Agarwal
      </a>
      {' · '}
      <a
        href="https://github.com/mayankagarwal09/dev-portfolio/blob/master/LICENSE.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        MIT License
      </a>
    </footer>
  );
}

function MainApp() {
  const data = useProfile('routes.json');

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            {data
              && data.sections.map((route) => {
                const SectionComponent = sections[route.component];
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<SectionComponent header={route.headerTitle} />}
                  />
                );
              })}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default MainApp;
