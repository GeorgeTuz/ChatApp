import { createSelector } from 'reselect';

const getChatSelect = state => state.chat;

// eslint-disable-next-line import/prefer-default-export
export const getMessagesReselect = createSelector([getChatSelect], chat => chat.messages);
