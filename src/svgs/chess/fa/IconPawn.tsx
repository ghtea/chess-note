import React, {useMemo} from "react";


type PropsIcon = {
  
  className: string;
  kind?: 'regular' | 'solid' | 'light' | 'duotone';  // thin, light, regular, solid, ...
  
} & typeof propsDefault;

const propsDefault = {  
    className: ''
};

 


// Pawn
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
        viewBox="0 0 320 512"
      >
      <path fill="currentColor" d="M304 464H16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zM48 288h32v29.5c0 40.29-3.51 81.23-23.43 114.5h53.57c15-37 17.86-77.35 17.86-114.5V288h64v29.5c0 37.15 2.91 77.49 17.86 114.5h53.57C243.51 398.73 240 357.79 240 317.5V288h32a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16h-31c23.8-21.93 39-53.08 39-88a120 120 0 0 0-240 0c0 34.92 15.16 66.07 39 88H48a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16zM160 80a72 72 0 1 1-72 72 72.08 72.08 0 0 1 72-72z"></path>
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
        viewBox="0 0 320 512"
      >
  <path fill="currentColor" d="M312 480H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zM56 256h40v32c0 73.62-11.36 128.34-33 160h36.8c18.66-37.54 28.2-91 28.2-160v-32h64v32c0 69 9.54 122.46 28.2 160H257c-21.6-31.66-33-86.38-33-160v-32h40a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8h-25.78a112 112 0 1 0-156.44 0H56a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8zm24-112a80 80 0 1 1 80 80 80.09 80.09 0 0 1-80-80z"></path>
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
        viewBox="0 0 320 512"
      >
    <path fill="currentColor" d="M105.1 224H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h16v5.49c0 44-4.14 86.6-24 122.51h176c-19.89-35.91-24-78.51-24-122.51V288h16a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-25.1c29.39-18.38 49.1-50.78 49.1-88a104 104 0 0 0-208 0c0 37.22 19.71 69.62 49.1 88zM304 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
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
        viewBox="0 0 320 512"
      >
        <g >
          <path className="fa-primary" fill="currentColor" d="M105.1 224H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h16v5.49c0 44-4.14 86.6-24 122.51h176c-19.89-35.91-24-78.51-24-122.51V288h16a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-25.1c29.39-18.38 49.1-50.78 49.1-88a104 104 0 0 0-208 0c0 37.22 19.71 69.62 49.1 88z"></path>
          <path className="fa-secondary" fill="currentColor" d="M304 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" opacity="0.4"></path>
        </g>
      </svg>
    }
      
    </span>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
