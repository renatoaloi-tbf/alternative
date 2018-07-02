import {Provider as ProviderRedux} from 'react-redux';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import {PersistGate} from 'redux-persist/es/integration/react';

// local
import {theme} from '~/config';

export const Provider = persistor => props => {
  console.log("Provider.js - persistor", persistor.getState());
  return (
    <ProviderRedux store={props.store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </PersistGate>
    </ProviderRedux>
  );
};
