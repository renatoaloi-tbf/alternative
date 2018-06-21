import React from 'react';
import styled from 'styled-components/native';
import {
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  withState,
  lifecycle,
  pure
} from 'recompose';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';

import {Header, MenuItem} from '~/components/Menu';
import {ScrollWrapper, Text} from '~/components/shared';

const enhance = compose(
  connect(
    ({user}) => ({user}),
    null
  ),
  pure
);

export const Menu = enhance(({user}) => {
  return (
    <Wrapper>
      <Header name={user.name} address={user.city} />
      <ScrollWrapperDefault contentContainerStyle={listStyle}>
        <MenuItem route="Home" name="Home" icon="home" />
        <MenuItem route="Quality" name="Qualidade" icon="certificate" />
        <MenuItem route="Volume" name="Volume" icon="beaker" />
        <MenuItem route="Price" name="Preço" icon="currency-usd" />
        <MenuItem
          route="Documentation"
          name="Documentos"
          icon="file-document"
        />
        <MenuItem
          route="Documentation"
          name="Política de privacidade"
          icon="lock"
        />
        <MenuItem
          route="Documentation"
          name="Termos de uso"
          icon="comment-text"
        />
        <MenuItem
          route="Documentation"
          name="Manual do produtor"
          icon="book-open"
        />
        <WrapperExit>
          <MenuItem
            route="Login"
            name="Sair"
            icon="logout-variant"
            logout={true}
          />
        </WrapperExit>
      </ScrollWrapperDefault>
    </Wrapper>
  );
});

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bg};
`;
const listStyle = {paddingBottom: 20};
//

const WrapperExit = styled.View`
  border-style: solid;
  border: 1px solid ${props => props.theme.bgSecondary};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  justify-content: center;
`;

const ScrollWrapperDefault = ScrollWrapper.extend`
  padding-top: 27;
`;
