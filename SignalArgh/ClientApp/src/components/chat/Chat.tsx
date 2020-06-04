import React from 'react';

import { Messages } from '../messages/Messages';
import { Send } from '../send/Send';

export const Chat: React.FC = (): JSX.Element => (
  <>
    <Messages />
    <Send />
  </>
);
