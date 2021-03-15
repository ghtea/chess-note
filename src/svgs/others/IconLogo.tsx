import React from "react";


type PropsIcon = {
  className?: string;
  kind?: 'regular' | 'solid' | 'light';  // thin, light, regular, solid, ...
} & typeof propsDefault;

const propsDefault = {  
  className: ''
};

// Template
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
        viewBox="0 0 640 512"
      >
      {(!kind || kind === 'regular') && 
<path fill="currentColor" d="M635.73 406.91l-194.04-297.6C435.9 100.44 425.95 96 416 96c-9.95 0-19.9 4.44-25.69 13.31l-52 79.76-70.79-110.55C261.32 68.84 250.66 64 240 64s-21.32 4.84-27.52 14.52L4.58 403.18C-7.99 422.81 6.81 448 30.92 448h580.22c22.5 0 36.32-23.09 24.59-41.09zM63.61 400L240 124.55 416.39 400H63.61zm409.78 0L366.71 233.4 416 157.8 573.92 400H473.39z"></path>
      }
      {(kind === 'light') && 
<path fill="currentColor" d="M635.73 406.91l-194.04-297.6C435.9 100.44 425.95 96 416 96c-9.95 0-19.9 4.44-25.69 13.31l-52 79.76-70.79-110.55C261.32 68.84 250.66 64 240 64s-21.32 4.84-27.52 14.52L4.58 403.18C-7.99 422.81 6.81 448 30.92 448h580.22c22.5 0 36.32-23.09 24.59-41.09zM33.71 417.02L239.03 96.17c.08-.04.44-.17.97-.17l.57-.22L445.63 416l-411.92 1.02zM479.65 416c-.39-4.33-1.58-8.7-4.22-12.82L357.24 218.62 416 128.51 603.45 416h-123.8z"></path>
      }
      {(kind === 'solid') && 
<path fill="currentColor" d="M635.73 406.91l-194.04-297.6c-11.57-17.75-39.8-17.75-51.37 0l-32.84 50.37 67.68 105.68c2.38 3.72 1.3 8.67-2.42 11.05l-13.46 8.62c-3.72 2.38-8.67 1.3-11.05-2.42l-59.9-93.54-70.81-110.55c-12.4-19.36-42.64-19.36-55.04 0L4.58 403.18C-7.99 422.81 6.81 448 30.92 448h580.22c22.5 0 36.32-23.09 24.59-41.09z"></path>
      }
        
      </svg>
      
    </span>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
