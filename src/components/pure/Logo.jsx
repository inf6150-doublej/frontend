import React from 'react';
import Image from 'react-image-resizer';

const Logo = (props) => {
  const { logo, viewHome } = props;
  return (
    <div id="logo" className="logo" onClick={() => viewHome('/')}>
      <Image
        src={logo}
        alt="apples in the bowl"
        width={230}
        height={50}
      />
    </div>
  );
};

export default Logo;
