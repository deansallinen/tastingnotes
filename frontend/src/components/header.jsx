import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Nav, Container } from 'reactbulma';
import UserSelect from './userSelect';

const Header = (props) => {
  const { onUserSelect, users } = props;
  return (
    <nav className="navbar  has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <span role="img" aria-label="Wine glass and music notes">
            🍷🎶
          </span>
          <span className="navbar-item">
            <strong>Tastingnotes</strong>
          </span>
        </a>

        {/* eslint-disable-next-line */}
        <a
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <UserSelect onUserSelect={onUserSelect} users={users} />

            {/* <div className="buttons">
                        <a className="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a className="button is-light">
                            Log in
                        </a>
                    </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
