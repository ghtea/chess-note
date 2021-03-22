import React, {useMemo} from "react";


type PropsIcon = {
  
  className: string;
  kind?: 'regular' | 'solid' | 'light' | 'duotone';  // thin, light, regular, solid, ...
  
} & typeof propsDefault;

const propsDefault = {  
    className: ''
};

 


// Knight
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
<path fill="currentColor" d="M44.05 320.68l14.41 6.41A113 113 0 0 0 32.07 400v32h48v-32a65.49 65.49 0 0 1 36.18-58.57L154.36 318a39.31 39.31 0 0 0 21.71-35.15v-58.78l-15.27 9.06a19.64 19.64 0 0 0-10.26 12.8L143 271a26.2 26.2 0 0 1-15.35 16.78L117.17 292a26.12 26.12 0 0 1-20.36-.38l-33.26-14.8A26.21 26.21 0 0 1 48 252.88V140.53a19.67 19.67 0 0 1 5.75-13.9l7.34-7.34L49.46 96A14 14 0 0 1 48 89.82 9.82 9.82 0 0 1 57.82 80h105.09c86.76 0 157 70.37 157 157.17V432h48V237.17C367.93 124 276 32 162.91 32H57.82A57.89 57.89 0 0 0 0 89.82a62.22 62.22 0 0 0 5.15 24.72 67.51 67.51 0 0 0-5.15 26v112.34a74.26 74.26 0 0 0 44.05 67.8zM80.07 164a20 20 0 1 0 20-20 20 20 0 0 0-20 20zM368 464H16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16z"></path>
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
<path fill="currentColor" d="M35.48 301.64c38 16.9 36.79 16.47 40.39 17.68A100.72 100.72 0 0 0 32 402.82V448h32v-45.18a69.35 69.35 0 0 1 38.31-62L144.62 316a41.62 41.62 0 0 0 23-37.21v-62.25l-16.16 9.59a20.8 20.8 0 0 0-10.87 13.56l-8 26.57A27.75 27.75 0 0 1 116.32 284l-11.08 4.43a27.68 27.68 0 0 1-21.56-.41l-35.2-15.62A27.74 27.74 0 0 1 32 247.05v-119c0-10.4 6.44-15.06 13.86-22.49L33.55 81c-4.67-9.33 1.63-17 8.85-17H128c106 0 192 86 192 192v192h32V256c0-123.51-100.49-224-224-224H42.4A42.45 42.45 0 0 0 0 74.4a46.92 46.92 0 0 0 4.94 20.9l2.69 5.39A52.56 52.56 0 0 0 0 128.09v119a59.8 59.8 0 0 0 35.48 54.55zM64 164a20 20 0 1 0 20-20 20 20 0 0 0-20 20zm312 316H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path>
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
<path fill="currentColor" d="M19 272.47l40.63 18.06a32 32 0 0 0 24.88.47l12.78-5.12a32 32 0 0 0 18.76-20.5l9.22-30.65a24 24 0 0 1 12.55-15.65L159.94 208v50.33a48 48 0 0 1-26.53 42.94l-57.22 28.65A80 80 0 0 0 32 401.48V416h319.86V224c0-106-85.92-192-191.92-192H12A12 12 0 0 0 0 44a16.9 16.9 0 0 0 1.79 7.58L16 80l-9 9a24 24 0 0 0-7 17v137.21a32 32 0 0 0 19 29.26zM52 128a20 20 0 1 1-20 20 20 20 0 0 1 20-20zm316 320H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
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
        <g>
        <path className="fa-secondary" fill="currentColor" d="M368 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" opacity="0.4"></path>
        <path className="fa-primary" fill="currentColor" d="M159.94 32H12A12 12 0 0 0 0 44a16.9 16.9 0 0 0 1.79 7.58L16 80l-9 9a24 24 0 0 0-7 17v137.21a32 32 0 0 0 19 29.26l40.63 18.06a32 32 0 0 0 24.88.47l12.79-5.12a32 32 0 0 0 18.75-20.5l9.22-30.65a24 24 0 0 1 12.55-15.65L159.94 208v50.33a48 48 0 0 1-26.53 42.94L76.2 329.92A80 80 0 0 0 32 401.48V416h319.86V224c0-106-85.92-192-191.92-192zM52 168a20 20 0 1 1 20-20 20 20 0 0 1-20 20z"></path>
        </g>
      </svg>
    }
      
    </span>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
