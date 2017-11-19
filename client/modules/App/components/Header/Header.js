import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header() {
  return (
    <div className={styles.header}>
      <h2 className={styles['site-title']}>
        <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
      </h2>
    </div>
  );
}

export default Header;
