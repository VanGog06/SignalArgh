import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ChatContext, IChatContext } from '../../context/ChatContext';
import styles from './Username.module.scss';

export const Username: React.FC = (): JSX.Element => {
  const history = useHistory();

  const { username, changeUsername }: IChatContext = useContext(ChatContext);

  const enter = useCallback((): void => {
    localStorage.setItem("username", username);
    history.push("/chat");
  }, [username, history]);

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        enter();
      }
    },
    [enter]
  );

  const modifyUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      changeUsername(event.target.value);
    },
    [changeUsername]
  );

  return (
    <div className={styles.username}>
      <label htmlFor="message">Enter username:</label>
      &nbsp;
      <input
        type="text"
        id="message"
        className={styles.username__input}
        value={username}
        onKeyUp={handleKeyUp}
        onChange={modifyUsername}
      />
      <button onClick={enter}>Enter</button>
    </div>
  );
};
