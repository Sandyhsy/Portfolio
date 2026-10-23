import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import useProfile from '../hooks/useProfile';
import ThemeToggler from './ThemeToggler';
import LanguageToggle from './LanguageToggle';

const ExternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const InternalNavLink = styled(Link)`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
  &.active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const location = useLocation();
  const data = useProfile('navbar.json');
  const [expanded, setExpanded] = useState(false);

  const isSectionActive = (href) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      const path = href.slice(0, hashIndex) || '/';
      const hash = href.slice(hashIndex);
      return location.pathname === path && location.hash === hash;
    }
    if (href === '/') {
      return location.pathname === '/' && location.hash === '';
    }
    return location.pathname === href;
  };

  return (
    <Navbar
      fixed="top"
      expand="md"
      variant={theme.bsPrimaryVariant}
      className="navbar-custom"
      expanded={expanded}
    >
      <Container>
        {data?.logo?.text && (
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="navbar__brand"
            onClick={() => setExpanded(false)}
          >
            {data.logo.text}
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            {data
              && data.sections?.map((section) => (section?.type === 'link' ? (
                <ExternalNavLink
                  key={section.title}
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setExpanded(false)}
                  className="navbar__link"
                  theme={theme}
                >
                  {section.title}
                </ExternalNavLink>
              ) : (
                <InternalNavLink
                  key={section.title}
                  onClick={() => setExpanded(false)}
                  className={`navbar__link${isSectionActive(section.href) ? ' active' : ''}`}
                  to={section.href}
                  theme={theme}
                >
                  {section.title}
                </InternalNavLink>
              )))}
          </Nav>
          <div className="navbar__controls">
            <LanguageToggle onClick={() => setExpanded(false)} />
            <ThemeToggler onClick={() => setExpanded(false)} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
