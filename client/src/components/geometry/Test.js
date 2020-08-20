import React, { Fragment } from 'react';
//import PropTypes from 'prop-types'

const Test = props => {
  return (
    <Fragment>
      <defs>
        <clipPath id='clipPath'>
          <polygon
            points='220,10 300,210 170,250 123,234'
            fill='none'
            stroke='black'
          />
        </clipPath>
        <clipPath id='clipPath2'>
          <polygon
            points='270,60 350,250 220,270 173,284'
            fill='none'
            stroke='black'
          />
        </clipPath>
      </defs>
      <polygon
        points='220,10 300,210 170,250 123,234'
        fill='none'
        stroke='black'
      />
      <polygon
        points='270,60 350,250 220,270 173,284'
        fill='none'
        stroke='black'
      />
      <foreignObject
        x='120'
        y='120'
        width='180'
        height='180'
        clipPath='url(#clipPath)'
      >
        <div xmlns='http://www.w3.org/1999/xhtml' className='fo'>
          <ul>
            <li>
              <strong>First</strong> item
            </li>

            <li>
              <em>Second</em> item
            </li>
            <li>Thrid item</li>
          </ul>
        </div>
      </foreignObject>
      <foreignObject
        x='170'
        y='170'
        width='180'
        height='180'
        clipPath='url(#clipPath2)'
      >
        <div xmlns='http://www.w3.org/1999/xhtml' className='fo'>
          <ul>
            <li>
              <strong>First</strong> item
            </li>

            <li>
              <em>Second</em> item
            </li>
            <li>Thrid item</li>
          </ul>
        </div>
      </foreignObject>
    </Fragment>
  );
};

//Test.propTypes = {}

export default Test;
