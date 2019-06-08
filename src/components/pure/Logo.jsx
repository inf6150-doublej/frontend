import React from 'react';
import Image from 'react-image-resizer';
import logo from '../../img/BE2.png';

// Logo to display on each page
const Logo = (props) => {
  const { viewHome, className, id, height, width } = props;
  return (
    <div id={id} className={className} onClick={viewHome}>
      <Image
        src={logo}
        alt='logo'
        height={height}
        width={width}
      />
    </div>
  );
};

export default Logo;
