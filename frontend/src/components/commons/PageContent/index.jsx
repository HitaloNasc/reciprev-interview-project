// global
import React from 'react';
import PropTypes from 'prop-types';
// stylesheets
import styles from './PageContent.module.scss';

function PageContent(props) {
  const { children, isSolid } = props;

  const { pageStructure, solid } = styles;
  const style = isSolid ? `${pageStructure} ${solid}` : `${pageStructure}`;

  return <div className={style}>{children}</div>;
}

PageContent.defaultProps = {
  isSolid: true,
};

PageContent.propTypes = {
  children: PropTypes.node,
  isSolid: PropTypes.bool,
};

export default PageContent;
