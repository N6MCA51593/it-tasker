import React from 'react';
import Wall from './Wall';
//import PropTypes from 'prop-types';

const Layout = points => {
  return (
    <svg>
      {points.map((e, i) => (
        <Wall key={i} coords={e} />
      ))}
    </svg>
  );
};

//Layout.propTypes = {};

export default Layout;
