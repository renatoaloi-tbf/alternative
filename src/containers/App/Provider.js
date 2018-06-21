import {Provider as ProviderRedux} from 'react-redux';
import React from 'react';
import {ThemeProvider} from 'styled-components';

// local
import {theme} from '../../config';

export const Provider = props => {
  console.log(props);
  return (
    <ProviderRedux store={props.store}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ProviderRedux>
  );
};
