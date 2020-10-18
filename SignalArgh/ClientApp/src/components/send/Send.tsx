import React, { useCallback, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { ChatContext, IChatContext } from '../../context/ChatContext';
import { ChatRow } from '../../models/ChatRow';
import { NotificationActions, triggerError } from '../../store/notifications/NotificationActions';
import { Emojis } from '../emojis/Emojis';
import { Gif } from '../gif/Gif';
import styles from './Send.module.scss';

export const Send: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch<NotificationActions>>();
  const { connection, username }: IChatContext = useContext(ChatContext);

  const [message, setMessage] = useState<string>("");

  const changeMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setMessage(event.target.value);
    },
    [setMessage]
  );

  const changeEmoji = useCallback(
    (emoji: string): void => {
      setMessage((pm: string) => `${pm}${emoji}`);
    },
    [setMessage]
  );

  const send = useCallback(async (): Promise<void> => {
    const chatRowToSend: ChatRow = {
      date: new Date().toLocaleDateString(),
      message,
      username,
    };

    try {
      await connection?.invoke("newMessage", chatRowToSend);
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
      &nbsp;
      <input
        type="text"
        id="message"
        className={styles.send__input}
        value={message}
        onKeyUp={handleKeyUp}
        onChange={changeMessage}
      />
      <Emojis changeEmoji={changeEmoji} />
      <Gif />
      <button onClick={send}>Send</button>
    </div>
  );
};
