import React from 'react';

import { Gif } from '../gif/Gif';
import { Messages } from '../messages/Messages';
import { Send } from '../send/Send';

export const Chat: React.FC = (): JSX.Element => (
  <>
    <Messages />
    <Send />
    <Gif />
  </>
);
