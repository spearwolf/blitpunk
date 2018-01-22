import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
// import oc from 'open-color/open-color.json';
import sortBy from 'lodash/sortBy';

import Logo from '../Logo';

import siteConfig from '../../../site-config';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${siteConfig.styles.sidebarWidth};
  z-index: 100;
  margin: 0;
  padding: 0;
`;

const SidebarContent = styled.header`
  padding: 1rem 1rem 2.5rem;
`;

const StyledLink = styled(Link)`
  display: block;
`;

const SidebarLink = ({ title, path }) => (
  <StyledLink to={path}>{ title }</StyledLink>
);

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const SectionTitle = styled.h4`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SidebarSection = ({ sectionTitle, pageType, links }) => (
  <Fragment>
    <SectionTitle>{ sectionTitle }</SectionTitle>
    { sortBy(links.filter(li => li.pageType === pageType), 'title').map(({ id, title, path }) => (
      <SidebarLink key={id} title={title} path={path} />
    ))}
  </Fragment>
);

SidebarSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    path: PropTypes.string,
    pageType: PropTypes.string,
  })).isRequired,
};

const Sidebar = ({ links }) => (
  <SidebarContainer>
    <SidebarContent>
      <Logo />
      <SidebarLink title="Home" path="/" />
      <SidebarSection sectionTitle="GUDIES" pageType="guide" links={links} />
      <SidebarSection sectionTitle="TAGS" pageType="tagDoc" links={links} />
      <SidebarSection sectionTitle="COMPONENTS" pageType="componentDoc" links={links} />
    </SidebarContent>
  </SidebarContainer>
);

Sidebar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    path: PropTypes.string,
    pageType: PropTypes.string,
  })).isRequired,
};

export default Sidebar;
