import { createSelector } from 'reselect';
import { AppStateType } from './store';

const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.usersDate;
};
export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true);
});
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};
export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};
export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};
export const getPagesListSize = (state: AppStateType) => {
  return state.usersPage.pagesListSize;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
