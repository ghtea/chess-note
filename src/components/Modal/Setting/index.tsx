import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import { firebaseAuth } from 'libraries/firebase';

import history from 'libraries/history';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';

import InputRadio from '../../common/Input/InputRadio';
import convertCase from 'tools/vanilla/convertCase';
import IconX from 'svgs/basic/IconX';

import styles from './index.module.scss';
import stylesModal from 'components/Modal/index.module.scss';

function Setting() {
  const dispatch = useDispatch();

  const languageCurrent: string = useSelector((state: RootState) => state.appearance.language);
  const optionThemeCurrent: string = useSelector(
    (state: RootState) => state.appearance.theme.option,
  );

  const onClick_CloseModal = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { value } = event.currentTarget;
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', value],
          replacement: false,
        }),
      );
    },
    [],
  );

  const refModal = useRef<HTMLDivElement>(null);
  const onClick_Window = useCallback(
    (event: MouseEvent) => {
      if (!refModal.current?.contains(event.target as Node)) {
        dispatch(
          actions.appearance.return__REPLACE({
            keyList: ['showing', 'modal', convertCase('Setting', 'camel')],
            replacement: false,
          }),
        );
      }
    },
    [refModal],
  );
  useEffect(() => {
    // close sub menu when click outside of menu
    window.addEventListener('click', onClick_Window);
    return () => window.removeEventListener('click', onClick_Window);
  }, [onClick_Window]);

  // ~ template
  const onChange_InputNormal = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    if (name === 'optionTheme') {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['theme', 'option'],
          replacement: value,
        }),
      );
      Cookies.set('optionTheme', value, { expires: 14 });
    } else if (name === 'language') {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['language'],
          replacement: value,
        }),
      );
    }
  }, []);

  const onClick_LogOut = useCallback(() => {
    dispatch(actions.auth.return__LOG_OUT());
  }, []);

  const draft = useMemo(() => {
    const result = {
      optionTheme: [
        { value: 'auto', label: 'auto' },
        { value: 'always-light', label: 'light' },
        { value: 'always-dark', label: 'dark' },
      ],
      language: [
        { value: 'ko', label: '한국어' },
        { value: 'en', label: 'English' },
      ],
    };
    return result;
  }, []);

  return (
    <div className={`${styles['root']} ${stylesModal['root']}`}>
      <div className={`${stylesModal['outside']}`} aria-label="Outside Setting" />

      <div
        className={`${stylesModal['modal']}`}
        role="dialog"
        aria-labelledby="Heading_Setting"
        ref={refModal}
      >
        <div className={`${stylesModal['header']}`}>
          <h2 id="Heading_Setting">
            {' '}
            <FormattedMessage id={`Modal.Setting_Title`} />{' '}
          </h2>
          <button
            type="button"
            aria-label="Close Setting"
            aria-haspopup="true"
            value={convertCase('Setting', 'camel')}
            onClick={onClick_CloseModal}
          >
            <IconX className={`${stylesModal['icon-x']}`} />
          </button>
        </div>

        <div className={`${stylesModal['division']}`} />

        <div className={`${stylesModal['content']}`}>
          <div className={`${stylesModal['content__section']}`}>
            <h3>
              {' '}
              <FormattedMessage id={`Modal.Setting_Theme`} />{' '}
            </h3>

            <div className={'container__input-radio'}>
              {draft['optionTheme'].map((element, index: number) => (
                <InputRadio
                  valueCurrent={optionThemeCurrent}
                  name="optionTheme"
                  value={element.value}
                  label={element.label}
                  onChange={onChange_InputNormal}
                  key={`InputRadio__optionTheme----${element.value}`}
                />
              ))}
            </div>
          </div>

          <div className={`${stylesModal['content__section']}`}>
            <h3>
              {' '}
              <FormattedMessage id={`Modal.Setting_Language`} />
            </h3>

            <div className={'container__input-radio'}>
              {draft['language'].map((element, index: number) => (
                <InputRadio
                  valueCurrent={languageCurrent}
                  name="language"
                  value={element.value}
                  label={element.label}
                  onChange={onChange_InputNormal}
                  key={`InputRadio__language----${element.value}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Setting.defaultProps = {};

export default Setting;
