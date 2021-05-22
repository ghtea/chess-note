import React from 'react';
import { render, beforeAllDefault } from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import { screen, fireEvent } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/dom';

import { Banner as TypeBanner } from 'store/reducers/notification';
import translationEn from 'language/translation/en.json';
import Banner from '.';

// import { StringLiteral } from 'typescript';
beforeAllDefault();

describe('<Banner />', () => {
  /*
    it('matches snapshot', () => {
        const {container} = render(<Banner />);
        expect(container).toMatchSnapshot();
    });
    */

  const bannerSample: TypeBanner = {
    situationCode: 'LogInGoogle_UnknownError__E',
    id: '2ec05680-c2a5-4820-bffd-0acd5605de34',
    messageId: 'Notification.LogInGoogle_UnknownError__E',
    situationKind: 'error',
    msTime: 5000,
  };

  it('delete banner', () => {
    render(<Banner banner={bannerSample} />);

    expect(
      screen.getByRole('alert', {
        name: translationEn[bannerSample.messageId as keyof typeof translationEn],
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delete Banner' }));

    waitFor(() =>
      expect(
        screen.queryByRole('alert', {
          name: translationEn[bannerSample.messageId as keyof typeof translationEn],
        }),
      ).not.toBeInTheDocument(),
    );
  });
});

// https://twitter.com/i/lists/create

// https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
// https://itnext.io/how-existing-redux-patterns-compare-to-the-new-redux-hooks-b56134c650d2
// 테스팅 등으로 비교한 connect vs useSelector
