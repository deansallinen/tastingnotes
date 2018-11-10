import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Nav, Container } from 'reactbulma';
import UserSelect from './userSelect';

const Header = props => (
  <nav className="navbar  has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
          <button className="navbar-item button is-text" href="/">
              <span role="img" aria-label="Wine glass and music notes">🍷🎶</span>
              <span className="navbar-item">
                  <strong>Tastingnotes</strong>
                </span>
            </button>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
        </div>

      <div id="navbarBasicExample" className="navbar-menu">
          {/* <div className="navbar-start">
                <a className="navbar-item">
                    Home
                </a>

                <a className="navbar-item">
                    Documentation
                </a>

                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                        More
                    </a>

                    <div className="navbar-dropdown">
                        <a className="navbar-item">
                            About
                        </a>
                        <a className="navbar-item">
                            Jobs
                        </a>
                        <a className="navbar-item">
                            Contact
                        </a>
                        <hr className="navbar-divider" />
                        <a className="navbar-item">
                            Report an issue
                        </a>
                    </div>
                </div>
            </div> */}

          <div className="navbar-end">
              <div className="navbar-item">
                  <UserSelect onUserSelect={props.onUserSelect} users={props.users} />

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

export default Header;

// export default () => (
//   <nav className="flex items-center justify-between flex-wrap bg-red-darker p-6">
//       <div className="logo flex items-center flex-no-shrink text-red-lightest mr-6">
//           <span className="text-red-lightest font-semibold text-xl tracking-tight ">Tastingnotes</span>
//         </div>
//       <div className="block lg:hidden">
//           <button className="flex items-center px-3 py-2 border rounded text-red-lighter border-red-lighter hover:text-red-lightest hover:border-red-lightest">
//               <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <title>Menu</title>
//                   <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//                 </svg>
//             </button>
//         </div>
//       <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
//           <div className="text-sm lg:flex-grow">
//               <span className="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-red-lightest mr-4">Docs</span>
//               <span className="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-red-lightest mr-4">Docs</span>
//               <span className="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-red-lightest mr-4">Docs</span>
//             </div>
//           <div>
//               <span className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-lighter border-red-lighter hover:border-transparent hover:text-red-darker hover:bg-red-lightest mt-4 lg:mt-0">Download</span>
//             </div>
//         </div>
//     </nav>
// );
