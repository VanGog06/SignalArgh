import React, { useCallback, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { ChatContext, IChatContext } from '../../context/ChatContext';
import { NotificationActions, triggerError } from '../../store/notifications/NotificationActions';
import styles from './Send.module.scss';

export const Send: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch<NotificationActions>>();
  const { connection }: IChatContext = useContext(ChatContext);

  const [message, setMessage] = useState<string>("");

  const changeMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setMessage(event.target.value);
    },
    [setMessage]
  );

  const send = useCallback(async (): Promise<void> => {
    const date: string = new Date().toLocaleString();

    try {
      await connection?.invoke("newMessage", date, message);
      setMessage("");
    } catch (err) {
      dispatch(triggerError(err.message));
    }
  }, [connection, setMessage, message, dispatch]);

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        send();
      }
    },
    [send]
  );

  return (
    <div className={styles.send}>
      <label htmlFor="message">Message:</label>
      <input
        type="text"
        id="message"
        className={styles.send__input}
        value={message}
        onKeyUp={handleKeyUp}
        onChange={changeMessage}
      />
      <button onClick={send}>Send</button>
    </div>
  );
};
