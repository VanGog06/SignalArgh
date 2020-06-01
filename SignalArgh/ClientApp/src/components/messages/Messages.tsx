import React, { useContext, useEffect, useRef } from 'react';

import { ChatContext, IChatContext } from '../../context/ChatContext';
import { ChatRow } from '../../models/ChatRow';
import styles from './Messages.module.scss';

export const Messages: React.FC = (): JSX.Element => {
  const { chat, username }: IChatContext = useContext(ChatContext);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef && divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div className={styles.messages}>
      {chat.map((c: ChatRow, index: number) => {
        return (
          <div ref={divRef} key={index}>
            <div>
              <span className={styles.messages__author}>{username}</span>
              &nbsp;
              <span className={styles.messages__date}>{c.date}</span>
            </div>
            <div>{c.message}</div>
          </div>
        );
      })}
    </div>
  );
};
