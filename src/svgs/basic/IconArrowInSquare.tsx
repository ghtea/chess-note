import React, {useMemo} from "react";


type PropsIcon = {
  
  className: string;
  kind?: 'regular' | 'solid' | 'light';  // thin, light, regular, solid, ...
  direction?: 'right' | 'left' | 'up' | 'down'; 
  
} & typeof propsDefault;

const propsDefault = {  
    className: ''
};

 


// ArrowInSquare
const Icon = ({ className, kind, direction }: PropsIcon) => {

    const transform: string = useMemo(()=>{
        if (direction === 'right'){
            return 'rotate(0deg)'
        }
        else if (direction === 'down'){
            return 'rotate(90deg)'
        }
        else if (direction === 'left'){
            return 'rotate(180deg)'
        }
        else if (direction === 'up'){
            return 'rotate(270deg)'
        }
        else {
            return 'rotate(0deg)'
        }
    },[direction]);

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
    <path fill="currentColor" d="M234.9 126.1l121.4 121.4c4.7 4.7 4.7 12.3 0 17L234.9 385.9c-4.7 4.7-12.3 4.7-17 0l-19.6-19.6c-4.8-4.8-4.7-12.5.2-17.2l70.3-67.1H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h160.8l-70.3-67.1c-4.9-4.7-5-12.4-.2-17.2l19.6-19.6c4.7-4.7 12.3-4.7 17 0zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
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
    <path fill="currentColor" d="M236.5 132.5l115.1 115c4.7 4.7 4.7 12.3 0 17l-115.1 115c-4.7 4.7-12.3 4.7-17 0l-6.9-6.9c-4.7-4.7-4.7-12.5.2-17.1l85.6-82.5H108c-6.6 0-12-5.4-12-12v-10c0-6.6 5.4-12 12-12h190.3l-85.6-82.5c-4.8-4.7-4.9-12.4-.2-17.1l6.9-6.9c4.8-4.7 12.4-4.7 17.1 0zM48 32h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48zm0 32c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H48z"></path>
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
      <path fill="currentColor" d="M48 32h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48zm147.1 119.6l75.5 72.4H88c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L372.3 273c9.4-9.4 9.4-24.6 0-33.9L239.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path>
      </svg>
    }
      
    </span>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
