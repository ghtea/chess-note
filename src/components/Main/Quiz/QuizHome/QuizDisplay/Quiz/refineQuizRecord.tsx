import { IntlShape, useIntl } from 'react-intl';
import * as types from 'store/types';


export default function (quizRecordList: types.auth.QuizRecord[] | undefined, quizId: string, intl: IntlShape) {

  const thisQuizRecord = (quizRecordList || []).find((e) => e.quizId === quizId);
  if (thisQuizRecord) {
    const result = thisQuizRecord.result;
    const dateDiff = Date.now() - thisQuizRecord.date;
    let dateText = '';
    if (dateDiff >= 1000 * 60 * 60 * 24 * 30) {
      // 한달 이상이면
      dateText = `${Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30))} ${intl.formatMessage({
        id: 'Main.QuizHome_QuizDisplay_MonthsAgo',
      })}`;
    } else if (dateDiff >= 1000 * 60 * 60 * 24) {
      // 1일 이상이면
      dateText = `${Math.floor(dateDiff / (1000 * 60 * 60 * 24))} ${intl.formatMessage({
        id: 'Main.QuizHome_QuizDisplay_DaysAgo',
      })}`;
    } else if (dateDiff >= 1000 * 60 * 60) {
      // 1시간 이상이면
      dateText = `${Math.floor(dateDiff / (1000 * 60 * 60))} ${intl.formatMessage({
        id: 'Main.QuizHome_QuizDisplay_HoursAgo',
      })}`;
    } else if (dateDiff >= 1000 * 60) {
      // 1분 이상이면
      dateText = `${Math.floor(dateDiff / (1000 * 60))} ${intl.formatMessage({
        id: 'Main.QuizHome_QuizDisplay_MinsAgo',
      })}`;
    } else {
      dateText = `${intl.formatMessage({
        id: 'Main.QuizHome_QuizDisplay_JustBefore',
      })}`;
    }

    return {
      result: result,
      dateText: dateText,
    };
  } else {
    return null;
  }
}
