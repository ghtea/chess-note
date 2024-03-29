import React, {useMemo} from "react";


type PropsIcon = {
  className?: string;
  direction?: 'ascending' | 'descending';
} & typeof propsDefault;

const propsDefault = {  
  className: ''
};

// SortButton
const Icon = ({ className, direction }: PropsIcon) => {

    const transform: string = useMemo(()=>{
        if (direction === 'descending'){
            return 'rotate(180deg)'
        }
        else { // direction === 'ascending'
            return 'rotate(0deg)'
        }
    },[direction]);


    return (
        <span 
            className={`${className} icon`} 
            style={{
                transform:transform,
              }}
        >
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
            <path className="up" fill="currentColor" d="M24.05 183.05l119.1-119A23.9 23.9 0 0 1 177 64a.94.94 0 0 1 .1.1l119 119c15.1 15.1 4.4 41-17 41h-238c-21.45-.05-32.1-25.95-17.05-41.05z"></path>
            <path className="down" fill="currentColor" d="M41.05 288.05h238c21.4 0 32.1 25.9 17 41l-119 119a23.9 23.9 0 0 1-33.8.1l-.1-.1-119.1-119c-15.05-15.05-4.4-41 17-41z" opacity="0.4"></path>

        </svg>
        
        </span>
    );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
