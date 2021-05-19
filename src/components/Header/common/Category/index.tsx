import React, { useCallback, useEffect, useMemo } from 'react';
import history from 'libraries/history';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';

import convertCase from 'tools/vanilla/convertCase';
import nav, { Category as TypeCategory, Link } from 'components/Header/nav';
import useLink from 'tools/hooks/useLink';

// import styles from './Category.module.scss';

import IconAngle from 'svgs/basic/IconAngle';

type PropsCategory = TypeCategory & {
  idCategoryOpen: string | undefined;
  onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  setIdCategoryOpen: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function Category({
  id: idCategory,
  listLink,

  idCategoryOpen,
  onClick,
  setIdCategoryOpen,
}: PropsCategory) {
  const dispatch = useDispatch();

  const onClick_Link = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.log('haha');
    const href = event.currentTarget.getAttribute('href'); // https://stackoverflow.com/questions/1550901/how-to-get-raw-href-contents-in-javascript
    if (href) {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'header', 'board'],
          replacement: false,
        }),
      );

      history.push(href);
      setIdCategoryOpen(undefined);
    }
  }, []);

  const idButton = useMemo(() => `button__idCategory----${idCategory}`, []);
  const idLabel = useMemo(() => `label__idCategory----${idCategory}`, []);

  const slugCategory = useMemo(() => encodeURIComponent(convertCase(idCategory, 'kebabLower')), []);

  const transform: string = useMemo(() => {
    if (idCategoryOpen === idCategory) {
      return 'rotate(270deg)';
    } else {
      return 'rotate(90deg)';
    }
  }, [idCategory, idCategoryOpen]);

  return (
    <li>
      <button
        type="button"
        value={idCategory}
        id={idButton}
        aria-labelledby={idLabel}
        aria-haspopup="menu"
        aria-expanded={idCategoryOpen === idCategory}
        onClick={onClick}
      >
        <label id={idLabel}>
          {' '}
          <FormattedMessage id={`Nav.${convertCase(idCategory, 'pascal')}`} />{' '}
        </label>
        <span
          style={{
            transform: transform,
          }}
        >
          <svg
            width="1.3em"
            height="1.3em"
            style={{ marginTop: '0.2em' }}
            fill="currentColor"
            className=""
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512"
          >
            <path
              fill="currentColor"
              d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"
            ></path>
          </svg>
        </span>
      </button>

      <ul role="menu" aria-labelledby={idLabel}>
        {listLink.map((linkEach, iEach) => {
          const slugLink = encodeURIComponent(convertCase(linkEach.id, 'kebabLower'));

          return (
            <li role="menuitem" key={`${idCategory}__link-${iEach}`}>
              <a href={`/${slugCategory}/${slugLink}`} onClick={onClick_Link}>
                <FormattedMessage
                  id={`Nav.${convertCase(idCategory, 'pascal')}_${convertCase(
                    linkEach.id,
                    'pascal',
                  )}`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default Category;
