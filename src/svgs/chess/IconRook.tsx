import React, {useMemo} from "react";


type PropsIcon = {
  
  className: string;
  kind?: 'regular' | 'solid' | 'light' | 'duotone';  // thin, light, regular, solid, ...
  
} & typeof propsDefault;

const propsDefault = {  
    className: ''
};

 


// Rook
const Icon = ({ className, kind }: PropsIcon) => {


  return (
    <span className={`${className} icon`} >
  
    {(!kind || kind === 'regular') && 
      <svg
        width="100%"
        height="100%"
        fill="currentColor"
        className=""
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
<path fill="currentColor" d="M368 464H16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zM346 32H38A38 38 0 0 0 0 70v139.43a32 32 0 0 0 11 24.14l37 32.21c0 48.49 1.54 93-11.85 166.22h49C98 356.41 96 309.53 96 238.22l-48-41.78V80h64v48h48V80h64v48h48V80h64v116.44l-48 41.78C288 309 286 356.6 298.86 432h49C334.47 358.81 336 314 336 265.78l37-32.21a32 32 0 0 0 11-24.14V70a38 38 0 0 0-38-38zM192 224a32 32 0 0 0-32 32v64h64v-64a32 32 0 0 0-32-32z"></path>
      </svg>
    }
    {(kind === 'light') && 
      <svg
        width="100%"
        height="100%"
        fill="currentColor"
        className=""
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
<path fill="currentColor" d="M376 480H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zM352 32H32A32 32 0 0 0 0 64v167.34l56 48C56 322 57.57 372.73 45.35 448h32.47C89.44 373.48 88 326.59 88 264.66l-56-48V64h80l.09 64h32V64H240v64h32V64h80v152.66l-56 48c0 62.63-1.41 109 10.18 183.34h32.47C326.43 372.77 328 322.05 328 279.34l56-48V64a32 32 0 0 0-32-32zM192 192a48.05 48.05 0 0 0-48 48v80h96v-80a48.05 48.05 0 0 0-48-48zm16 96h-32v-48a16 16 0 0 1 32 0z"></path>
      </svg>
    } 
    {(kind === 'solid') && 
      <svg
        width="100%"
        height="100%"
        fill="currentColor"
        className=""
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
<path fill="currentColor" d="M368 32h-56a16 16 0 0 0-16 16v48h-48V48a16 16 0 0 0-16-16h-80a16 16 0 0 0-16 16v48H88.1V48a16 16 0 0 0-16-16H16A16 16 0 0 0 0 48v176l64 32c0 48.33-1.54 95-13.21 160h282.42C321.54 351 320 303.72 320 256l64-32V48a16 16 0 0 0-16-16zM224 320h-64v-64a32 32 0 0 1 64 0zm144 128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
      </svg>
    }
    {(kind === 'duotone') && 
      <svg
        width="100%"
        height="100%"
        fill="currentColor"
        className=""
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <g >
        <path className="fa-secondary" fill="currentColor" d="M368 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" opacity="0.4"></path>
        <path className="fa-primary" fill="currentColor" d="M384 48a16 16 0 0 0-16-16h-56a16 16 0 0 0-16 16v48h-48V48a16 16 0 0 0-16-16h-80a16 16 0 0 0-16 16v48H88.1V48a16 16 0 0 0-16-16H16A16 16 0 0 0 0 48v176l64 32c0 48.33-1.54 95-13.21 160h282.42C321.54 351 320 303.72 320 256l64-32zM224 320h-64v-64a32 32 0 0 1 64 0z"></path>
        </g>
      </svg>
    }
      
    </span>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
