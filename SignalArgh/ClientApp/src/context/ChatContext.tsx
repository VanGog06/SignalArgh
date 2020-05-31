import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import { ChatRow } from '../models/ChatRow';
import { NotificationActions, triggerError } from '../store/notifications/NotificationActions';

export interface IChatContext {
  connection: HubConnection | undefined;
  chat: ChatRow[];
  username: string;
  changeUsername(enteredUsername: string): void;
}

const defaultValue: IChatContext = {
  connection: undefined,
  chat: [],
  username: "",
  changeUsername: () => {},
};

export const ChatContext = React.createContext(defaultValue);

export const ChatProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch<Dispatch<NotificationActions>>();

  const [chat, setChat] = useState<ChatRow[]>([]);
  const [username, setUsername] = useState<string>("");
  const [connection, setConnection] = useState<HubConnection | undefined>(
    undefined
  );

  const changeChat = useCallback(
    (newRow: ChatRow): void => {
      const currentChat = cloneDeep(chat);
      currentChat.push(newRow);

      setChat(currentChat);
    },
    [setChat, chat]
  );

  const changeUsername = useCallback(
    (enteredUsername: string): void => {
      setUsername(enteredUsername);
    },
    [setUsername]
  );

  useEffect(() => {
    const localStorageUsername: string | null = localStorage.getItem(
      "username"
    );

    if (localStorageUsername) {
      setUsername(localStorageUsername);
    }
  }, []);

  useEffect(() => {
    const connection: HubConnection = new HubConnectionBuilder()
      .withUrl("/hub")
      .build();

    connection.on("messageReceived", (date: string, message: string) => {
      changeChat({ date, message });
    });

    try {
      connection.start();
      setConnection(connection);
    } catch (err) {
      dispatch(triggerError(err.message));
    }

    return () => {
      connection.stop();
      setConnection(undefined);
    };
  }, [setConnection, changeChat]);

  return (
    <ChatContext.Provider
      value={{ chat, connection, username, changeUsername }}
    >
      {children}
    </ChatContext.Provider>
  );
};
