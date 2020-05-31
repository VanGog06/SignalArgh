export enum NotificationActionTypes {
  TRIGGER_ERROR = "TRIGGER_ERROR",
}

export interface TriggerErrorAction {
  type: NotificationActionTypes.TRIGGER_ERROR;
  payload: { message: string };
}

export const triggerError = (message: string): TriggerErrorAction => {
  return {
    type: NotificationActionTypes.TRIGGER_ERROR,
    payload: { message },
  };
};

export type NotificationActions = TriggerErrorAction;
