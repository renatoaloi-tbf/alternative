import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import ReduxThunk from 'redux-thunk';
import {reducer as form} from 'redux-form';
import {AsyncStorage} from 'react-native';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using

// local
import {
  price,
  menu,
  quality,
  statements,
  volume,
  researched,
  user
} from '../reducers';

const appReducer = combineReducers({
  price,
  menu,
  quality,
  statements,
  volume,
  researched,
  form,
  user
});

var middlewares = compose(applyMiddleware(ReduxThunk));

const config = {
  key: 'root',
  storage
};

const reducer = persistReducer(config, appReducer);
// const persistedReducer = persistReducer(persistConfig, appReducer);

export const configureStore = () => {
  const store = createStore(reducer, devToolsEnhancer(), middlewares);
  let persistor = persistStore(store);
  return {persistor, store};
};
