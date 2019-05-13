import React from 'react';
import Image from 'react-image-resizer';

const logo = require('../../img/logo.svg');


const Logo = (props) => {
  const { viewHome } = props;
  return (
    <div id="logo" onClick={() => viewHome('/')}>
      <Image
        src={logo}
        alt="react logo"
        width={230}
        height={50}
      />
    </div>
  );
};

export default Logo;
