import React, {useCallback} from 'react';
import { History } from 'history';

const useLink = (history: History) => {
    
    const onClick_LinkInsideApp = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const href = event.currentTarget.getAttribute("href");  // https://stackoverflow.com/questions/1550901/how-to-get-raw-href-contents-in-javascript
        if (href) {
            history.push(href);
        }
        },[]
    );

	return {onClick_LinkInsideApp};
}

export default useLink;