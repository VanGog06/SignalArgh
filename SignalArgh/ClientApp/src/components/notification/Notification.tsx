import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import { IState } from '../../store/IState';
import { Notification as NotificationModel } from '../../store/notifications/Notification';

export const Notification: React.FC = (): JSX.Element => {
  const { message }: NotificationModel = useSelector(
    (state: IState) => state.notification
  );

  useEffect(() => {
    if (message) {
      toast.error(`💥 ${message}`);
    }
  }, [message]);

  return <ToastContainer position="bottom-center" autoClose={5000} />;
};
