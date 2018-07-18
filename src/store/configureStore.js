import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import ReduxThunk from 'redux-thunk';
import {reducer as form} from 'redux-form';
import {AsyncStorage} from 'react-native';
import {
  persistStore,
  persistReducer,
  persistCombineReducers
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// local
import {
  price,
  menu,
  quality,
  statements,
  volume,
  researched,
  user,
  backend,
  factors
} from '../reducers';

const config = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};

const appReducer = persistCombineReducers(config, {
  price,
  menu,
  quality,
  statements,
  volume,
  researched,
  form,
  user,
  backend,
  factors
}, () => { 
  if (__DEV__) console.log('rehydration complete!', store.getState());
});

var middlewares = compose(applyMiddleware(ReduxThunk));

// const reducer = persistReducer(config, appReducer);
// const persistedReducer = persistReducer(persistConfig, appReducer);

export const configureStore = () => {
  //const store = createStore(appReducer, devToolsEnhancer(), middlewares);
  const store = createStore(appReducer, undefined, middlewares);
  if (__DEV__) console.log("configureStore.js - getData1", store.getState());
  let persistor = persistStore(store);
  if (__DEV__) console.log("configureStore.js - getData2", persistor.getState());
  return {persistor, store};
};
