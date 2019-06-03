import React from 'react';
import Image from 'react-image-resizer';
import logo from '../../img/BE2.png';


const Logo = (props) => {
  const { viewHome } = props;
  return (
    <div id="logo" onClick={() => viewHome('/')}>
      <Image
        src={logo}
        alt="react logo"
        height={60}
        width={60}
      />
    </div>
  );
};

export default Logo;
