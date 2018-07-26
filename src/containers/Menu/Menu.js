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
import {
  ScrollWrapper,
  Text,
  StatusBarBackgroundColor
} from '~/components/shared';
import {version} from '~/config';

const enhance = compose(
  connect(
    ({user}) => ({user}),
    null
  ),
  pure
);

export const Menu = enhance(({user}) => {
  if (__DEV__) console.log("Menu.js - enhance", user);
  return (
    <Wrapper>
      <StatusBarBackgroundColor />
      <Header name={user.name} address={user.city} />
      <ScrollWrapperDefault>
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
          route="PrivacyPolicy"
          name="Política de privacidade"
          icon="lock"
          link={false}
        />
        <MenuItem
          route="UseTerms"
          name="Termos de uso"
          icon="comment-text"
          link={false}
        />
        <MenuItem
          name="Manual do produtor"
          icon="book-open"
          route="http://milk-web.brazilsouth.cloudapp.azure.com:3000/manual-do-produtor"
          link={true}
        />
        <WrapperExit>
          <MenuItem
            route="Login"
            name="Sair"
            icon="logout-variant"
            logout={true}
          />
        </WrapperExit>
        <ViewStyled><TextStyled>{version}</TextStyled></ViewStyled>
      </ScrollWrapperDefault>
    </Wrapper>
  );
});

const ViewStyled = styled.View`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

const TextStyled = styled.Text`
  color: grey;
  font-size: 12px;
  padding-right: 8;
`;

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

const ScrollWrapperDefault = ScrollWrapper.extend``;
