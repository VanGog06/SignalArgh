import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './';

export const store = createStore(rootReducer, applyMiddleware(logger));
