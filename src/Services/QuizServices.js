import { http } from "./index";
import { SERVER_URL } from "../Constant/env";
export const getMycategories = () => {
  return http.get(`${SERVER_URL}api/users/getMycategories`);
};
export const getMyQuizzes = () => {
  return http.get(`${SERVER_URL}api/users/getMyQuizzes`);
};
export const getMyChapters = () => {
  return http.get(`${SERVER_URL}api/users/getMyChapters`);
};

export const getMyCateogryTree = () => {
  return http.get(`${SERVER_URL}api/users/getMyCateogryTree`);
};
export const getChapterByQuizID = (QuizID) => {
  return http.get(`${SERVER_URL}api/users/getChapterByQuizID/${QuizID}`);
};
export const getQuizByQuizChapter = (ChapterID) => {
  return http.get(
    `${SERVER_URL}api/questions/revision/getQuizByQuizChapter/${ChapterID}`
  );
};
