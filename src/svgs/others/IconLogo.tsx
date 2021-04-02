import React from "react";


type PropsIcon = {
  className?: string;
  kind?: 'regular' | 'solid' | 'light';  // thin, light, regular, solid, ...
} & typeof propsDefault;

const propsDefault = {  
  className: ''
};

// Logo game-board-alt
const Icon = ({ className, kind }: PropsIcon) => {
  return (
    <span className={`${className} icon`} >
      <svg
        width="100%"
        height="100%"
        fill="currentColor"
        className=""
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
      {(!kind || kind === 'regular') && 
      <path fill="currentColor" d="M480 0H32A32 32 0 0 0 0 32v448a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zm-16 464H48V48h416zm-48-48V256H256v160zM256 96H96v160h160z"></path>
      }
      {(kind === 'light') && 
      <path fill="currentColor" d="M480 0H32A32 32 0 0 0 0 32v448a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zm0 480H32V32h448zm-32-32V256H256v192zM288 288h128v128H288zM256 64H64v192h192zm-32 160H96V96h128z"></path>
      }
      {(kind === 'solid') && 
      <path fill="currentColor" d="M480 0H32A32 32 0 0 0 0 32v448a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zm-32 256H256v192H64V256h192V64h192z"></path>
      }
        
      </svg>
      
    </span>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
