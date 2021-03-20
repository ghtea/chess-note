import React, {useMemo} from "react";


type PropsIcon = {
  
  className: string;
  kind?: 'regular' | 'solid' | 'light' | 'duotone';  // thin, light, regular, solid, ...
  
} & typeof propsDefault;

const propsDefault = {  
    className: ''
};

 


// King
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
        viewBox="0 0 448 512"
      >
  <path fill="currentColor" d="M400 464H48a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm37.05-281.16A55.37 55.37 0 0 0 391.93 160H248v-56h48a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8h-48V8a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v48h-48a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h48v56H56a55.95 55.95 0 0 0-53.31 73.06L68.51 432h50.54L48.38 218.38A8 8 0 0 1 56 208h335.93a8 8 0 0 1 7.78 10l-70.82 214h50.55l66-199.31a55.35 55.35 0 0 0-8.39-49.85z"></path>
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
        viewBox="0 0 448 512"
      >
<path fill="currentColor" d="M408 480H40a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm31.34-301.88A44 44 0 0 0 403.51 160H240V96h56a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8h-56V8a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v56h-56a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h56v64H44.46a44.46 44.46 0 0 0-42.34 58L79 448h33.75L32.59 208.16A12.42 12.42 0 0 1 44.46 192h359.05c10.57 0 13.67 10.38 12 15.88L335.2 448H369l77-230.28a44.07 44.07 0 0 0-6.68-39.6z"></path>
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
        viewBox="0 0 448 512"
      >
<path fill="currentColor" d="M400 448H48a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm16-288H256v-48h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8h-40V8a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v40h-40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40v48H32a32 32 0 0 0-30.52 41.54L74.56 416h298.88l73.08-214.46A32 32 0 0 0 416 160z"></path>
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
        viewBox="0 0 448 512"
      >
        <g  >
        <path className="fa-secondary" fill="currentColor" d="M400 448H48a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" opacity="0.4"></path>
        <path className="fa-primary" fill="currentColor" d="M416 160H256v-48h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8h-40V8a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v40h-40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40v48H32a32 32 0 0 0-30.52 41.54L74.56 416h298.88l73.08-214.46A32 32 0 0 0 416 160z"></path>
        </g>
      </svg>
    }
      
    </span>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
