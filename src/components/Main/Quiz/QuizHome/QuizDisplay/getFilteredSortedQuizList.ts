import { each } from 'immer/dist/internal';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import * as types from 'store/types';

export default function getFilteredSortedQuizList(
  quizList: types.quiz.Quiz[],
  filteringOptionList: types.quiz.FilteringOption[],
  sortingOptionList: types.quiz.SortingOption[],
  userId: string | undefined,
  member: types.auth.Member | null,
) {
  // filter

  // my, public
  let aFilteredQuizIdList: string[] = [];
  if (filteringOptionList.includes('my-quiz')) {
    aFilteredQuizIdList = aFilteredQuizIdList.concat(
      quizList.filter((e) => userId && e.authorId === userId).map((e) => e.id),
    );
  }
  if (filteringOptionList.includes('public-quiz')) {
    aFilteredQuizIdList = aFilteredQuizIdList.concat(
      quizList.filter((e) => e.isPublic === true).map((e) => e.id),
    );
  }

  // like-dislike
  let bFilteredQuizIdList: string[] = [];
  if (filteringOptionList.includes('i-liked')) {
    bFilteredQuizIdList = bFilteredQuizIdList.concat(
      quizList
        .filter((e) => userId && e.memberReaction.likedMemberIdList.includes(userId))
        .map((e) => e.id),
    );
  }
  if (filteringOptionList.includes('not-decided')) {
    bFilteredQuizIdList = bFilteredQuizIdList.concat(
      quizList
        .filter(
          (e) =>
            userId &&
            !e.memberReaction.likedMemberIdList.includes(userId) &&
            !e.memberReaction.dislikedMemberIdList.includes(userId),
        )
        .map((e) => e.id),
    );
  }
  if (filteringOptionList.includes('i-disliked')) {
    bFilteredQuizIdList = bFilteredQuizIdList.concat(
      quizList
        .filter((e) => userId && e.memberReaction.dislikedMemberIdList.includes(userId))
        .map((e) => e.id),
    );
  }

  // solved-failed
  let cFilteredQuizIdList: string[] = [];
  if (filteringOptionList.includes('i-solved')) {
    cFilteredQuizIdList = cFilteredQuizIdList.concat(
      quizList
        .filter((eachQuiz) => {
          const record = member?.quizRecordList.find(
            (eachRecord) => eachRecord.quizId === eachQuiz.id,
          );
          if (record && record.result === true) {
            return true;
          } else {
            return false;
          }
        })
        .map((e) => e.id),
    );
  }

  if (filteringOptionList.includes('not-tried')) {
    cFilteredQuizIdList = cFilteredQuizIdList.concat(
      quizList
        .filter(
          (eachQuiz) =>
            member?.quizRecordList.findIndex((eachRecord) => eachRecord.quizId === eachQuiz.id) ===
            -1,
        )
        .map((e) => e.id),
    );
  }

  if (filteringOptionList.includes('i-failed')) {
    cFilteredQuizIdList = cFilteredQuizIdList.concat(
      quizList
        .filter((eachQuiz) => {
          const record = member?.quizRecordList.find(
            (eachRecord) => eachRecord.quizId === eachQuiz.id,
          );
          if (record && record.result === false) {
            return true;
          } else {
            return false;
          }
        })
        .map((e) => e.id),
    );
  }
  // 교집합
  let filteredQuizIdList: string[] = aFilteredQuizIdList
    .filter((e) => bFilteredQuizIdList.includes(e))
    .filter((e) => cFilteredQuizIdList.includes(e));

  // 중복 제거
  // https://wsvincent.com/javascript-remove-duplicates-array/
  filteredQuizIdList = filteredQuizIdList.filter((e, i) => filteredQuizIdList.indexOf(e) === i);

  const filteredQuizList = filteredQuizIdList
    .map((eachId) => quizList.find((e) => e.id === eachId))
    .filter((e) => e !== undefined);

  const filteredSortedQuizList = filteredQuizList as types.quiz.Quiz[];

  // sorting
  const sortingOptionStack = [...sortingOptionList];
  // 우선순위 낮은 항목일 수록 먼저 정렬에 이용
  while (sortingOptionStack.length > 0) {
    const currentOption = sortingOptionStack.pop();
    if (currentOption?.isActive) {
      if (currentOption?.property === 'triedDate') {
        if (member) {
          // 기본으로 ascending
          filteredSortedQuizList.sort((a, b) => {
            const aTriedDate = getTriedDate(a.id, member);
            const bTriedDate = getTriedDate(b.id, member);

            if (!aTriedDate) {
              return -1;
            } else if (!bTriedDate) {
              return 1;
            } else if (aTriedDate < bTriedDate) {
              return -1;
            } else if (bTriedDate < aTriedDate) {
              return 1;
            } else {
              return 0;
            }
          });

          if (currentOption.direction === 'descending') {
            filteredSortedQuizList.reverse();
          }
        }
      } // each property
    } // isActive
  }

  return filteredSortedQuizList;
}

function getTriedDate(quizId: string, member: types.auth.Member) {
  return member.quizRecordList.find((e) => e.quizId === quizId)?.date;
}
