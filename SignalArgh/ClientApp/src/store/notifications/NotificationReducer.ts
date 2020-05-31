import { Notification } from './Notification';
import { NotificationActions, NotificationActionTypes } from './NotificationActions';

const initialState: Notification = {
  message: "",
};

export const notificationReducer = (
  state: Notification = initialState,
  action: NotificationActions
): Notification => {
  switch (action.type) {
    case NotificationActionTypes.TRIGGER_ERROR:
      return {
        message: action.payload.message,
      };
    default:
      return { ...state };
  }
};
