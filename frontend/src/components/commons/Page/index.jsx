import React from 'react';
import PropTypes from 'prop-types';
import styles from './Page.module.scss';

function Page(props) {
  return <div id={styles.pageSimple}>{props.children}</div>;
}

Page.propTypes = {
  children: PropTypes.node,
};
export default Page;
