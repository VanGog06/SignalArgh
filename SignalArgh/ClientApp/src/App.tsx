import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'emoji-mart/css/emoji-mart.css';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Chat } from './components/chat/Chat';
import { Notification } from './components/notification/Notification';
import { Username } from './components/username/Username';
import { ChatProvider } from './context/ChatContext';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ChatProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/chat">
              <Chat />
            </Route>

            <Route exact path="/">
              <Username />
            </Route>
          </Switch>
        </BrowserRouter>
      </ChatProvider>

      <Notification />
    </Provider>
  );
}

export default App;
