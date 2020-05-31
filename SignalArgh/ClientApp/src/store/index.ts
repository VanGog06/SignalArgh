import { combineReducers } from 'redux';

import { notificationReducer } from './notifications/NotificationReducer';

export const rootReducer = combineReducers({
  notification: notificationReducer,
});
