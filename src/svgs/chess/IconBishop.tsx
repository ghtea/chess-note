import React, {useMemo} from "react";


type PropsIcon = {
  
  className: string;
  kind?: 'regular' | 'solid' | 'light' | 'duotone';  // thin, light, regular, solid, ...
  
} & typeof propsDefault;

const propsDefault = {  
    className: ''
};

 


// Bishop
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
  <path fill="currentColor" d="M304 464H16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zM0 304c0 51.64 30.14 85.24 64 96v32h48v-67.11l-33.46-10.64C63.78 349.56 48 333.9 48 304c0-74.57 66.13-165.78 101.33-201.84a15.81 15.81 0 0 1 22.27-.24c12.64 11.8 34 35.52 59.22 81.33l-66.13 66.13a16 16 0 0 0 0 22.62L176 283.31a16 16 0 0 0 22.62 0L252.94 229c11.43 27.7 19.06 54.54 19.06 75 0 29.9-15.78 45.56-30.54 50.25L208 364.89V432h48v-32c33.86-10.76 64-44.36 64-96 0-73.38-67.81-197.2-120.6-241.49C213.4 59.09 224 47.05 224 32a32 32 0 0 0-32-32h-64a32 32 0 0 0-32 32c0 15 10.6 27.09 24.6 30.51C67.81 106.8 0 230.62 0 304z"></path>
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
  <path fill="currentColor" d="M64 400v48h32v-71.41l-22.31-7.09C53.54 363.1 32 342.52 32 304c0-58.29 54.72-162.67 99.6-208h56.8c19.29 19.48 40.19 50 58 83l-84 84a8 8 0 0 0 0 11.32l11.31 11.31a8 8 0 0 0 11.32 0l76.43-76.44C277.09 243.77 288 278.35 288 304c0 38.52-21.54 59.1-41.69 65.5L224 376.59V448h32v-48c33.86-10.76 64-44.36 64-96 0-72.64-66.43-194.57-119-240h-82C66.43 109.43 0 231.36 0 304c0 51.64 30.14 85.24 64 96zm248 80H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zM112 32h96a16 16 0 0 0 0-32h-96a16 16 0 0 0 0 32z"></path>
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
  <path fill="currentColor" d="M8 287.88c0 51.64 22.14 73.83 56 84.6V416h192v-43.52c33.86-10.77 56-33 56-84.6 0-30.61-10.73-67.1-26.69-102.56L185 285.65a8 8 0 0 1-11.31 0l-11.31-11.31a8 8 0 0 1 0-11.31L270.27 155.1c-20.8-37.91-46.47-72.1-70.87-92.59C213.4 59.09 224 47.05 224 32a32 32 0 0 0-32-32h-64a32 32 0 0 0-32 32c0 15 10.6 27.09 24.6 30.51C67.81 106.8 8 214.5 8 287.88zM304 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
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
        <g>
        <path className="fa-secondary" fill="currentColor" d="M304 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" opacity="0.4"></path>
        <path className="fa-primary" fill="currentColor" d="M8 287.88c0 51.64 22.14 73.83 56 84.6V416h192v-43.52c33.86-10.77 56-33 56-84.6 0-30.61-10.73-67.1-26.69-102.56L185 285.65a8 8 0 0 1-11.31 0l-11.31-11.31a8 8 0 0 1 0-11.31L270.27 155.1c-20.8-37.91-46.47-72.1-70.87-92.59C213.4 59.09 224 47.05 224 32a32 32 0 0 0-32-32h-64a32 32 0 0 0-32 32c0 15 10.6 27.09 24.6 30.51C67.81 106.8 8 214.5 8 287.88z"></path>
        </g>
      </svg>
    }
      
    </span>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
