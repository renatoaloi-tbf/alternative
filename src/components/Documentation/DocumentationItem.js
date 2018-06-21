import React from 'react';
import styled, {css} from 'styled-components/native';
import {compose, setPropTypes, withHandlers, pure} from 'recompose';
import {string} from 'prop-types';
import {TouchableOpacity} from 'react-native';

import {Text, Icon, IconUri} from '~/components/shared';
import {getNavigatorContext} from '~/enhancers';
import {navigatorStyle} from '~/config';

const enhance = compose(
  getNavigatorContext,
  pure,
  setPropTypes({
    icon: string.isRequired,
    description: string.isRequired,
    route: string.isRequired,
    demonstrative: string,
    month: string
  }),
  withHandlers({
    goTo: ({navigator, route, month}) => () => {
      debugger;
      navigator.push({
        screen: route,
        navigatorStyle,
        passProps: {
          month
        }
      });
    }
  }),
  pure
);

const DocumentationItemEnchance = enhance(props => {
  console.log(props.isActived);
  return (
    <TouchableOpacityDefault {...props}>
      <WrapperIcon>
        <IconDefault size={50} secondary name={props.icon} />
      </WrapperIcon>
      <Body>
        <WrapperDescription>
          <Text align="center" inverted size={20}>
            {props.description}
          </Text>
        </WrapperDescription>

        <WrapperDemonstrative>
          <TextDemonstrative align="center" inverted size={13}>
            27.694 L
          </TextDemonstrative>
        </WrapperDemonstrative>
      </Body>
      <Footer onPress={props.goTo}>
        <Text inverted>Visualizar</Text>
      </Footer>
    </TouchableOpacityDefault>
  );
});

export const DocumentationItem = styled(DocumentationItemEnchance)``;

const TouchableOpacityDefault = styled.View`
  align-items: center;
  width: 49%;
  border-radius: 3;
  margin-top: 8;
  box-shadow: 0px 0.5px 1px #e0e0e0;

  ${props =>
    props.light &&
    css`
      background-color: #00cdff;
    `}


  ${props =>
    props.danger &&
    css`
      background-color: ${props => props.theme.dangerMenu};
    `}

  ${props =>
    props.success &&
    css`
      background-color: ${props => props.theme.successMenu};
    `}

  ${props =>
    props.warning &&
    css`
      background-color: #ff8600;
    `}
  ${props =>
    props.warningLigth &&
    css`
      background-color: #ffbd00;
    `}
  ${props =>
    props.info &&
    css`
      background-color: #0096ff;
    `}
`;

const Wrapper = styled.View`
  align-items: center;
  width: 49%;
  border-radius: 3;
  margin-top: 8;
  box-shadow: 0px 0.5px 1px #e0e0e0;

  

  ${props =>
    props.danger &&
    css`
      background-color: ${props => props.theme.dangerMenu};
    `}

  ${props =>
    props.success &&
    css`
      background-color: ${props => props.theme.successMenu};
    `}

  ${props =>
    props.warning &&
    css`
      background-color: ${props => props.theme.warningMenu};
    `}
    

  ${props =>
    props.info &&
    css`
      background-color: #0096ff;
    `}
`;

const Body = styled.View`
  padding-top: 15;
  padding-bottom: 10;
  height: 130;
`;

const Footer = styled(TouchableOpacity)`
  padding-top: 15;
  padding-bottom: 15;
  border-top-width: 0.3px;
  border-top-color: ${props => props.theme.bgSecondary};
  width: 100%;
  align-items: center;
`;

const IconDefault = Icon.extend``;

const WrapperIcon = styled.View`
  padding-top: 10;
`;

const WrapperDemonstrative = styled.View`
  padding-top: 14;
  padding-bottom: 14;
`;

const TextDemonstrative = Text.extend`
  opacity: 0.5;
`;
const WrapperDescription = styled.View`
  padding-left: 5;
  padding-right: 5;
  padding-top: 10;
  padding-bottom: 10;
`;
