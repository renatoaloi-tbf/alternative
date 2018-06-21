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
    route: string.isRequired
  }),
  withHandlers({
    goTo: ({navigator, route}) => () => {
      navigator.push({
        screen: route,
        navigatorStyle
      });
    }
  })
);

const QuickMenuItemEnchance = enhance(props => {
  return (
    <TouchableOpacityDefault {...props} onPress={props.goTo}>
      <WrapperIcon>
        <IconDefault size={50} secondary name={props.icon} />
      </WrapperIcon>
      <Bottom>
        <Text inverted size={22} weight="700">
          {props.description}
        </Text>
      </Bottom>
    </TouchableOpacityDefault>
  );
});

export const QuickMenuItem = styled(QuickMenuItemEnchance)``;

const TouchableOpacityDefault = styled(TouchableOpacity)`
  align-items: center;
  width: 49%;
  border-radius: 2;
  margin-top: 8;
  box-shadow: 0px 0.5px 1px #e0e0e0;
  elevation: 3;
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
      background-color: ${props => props.theme.infoMenu};
    `}
`;

const Wrapper = styled.View`
  align-items: center;
  width: 49%;
  border-radius: 3;
  margin-top: 8;
  box-shadow: 0px 0.5px 1px #e0e0e0;
  shadow-color: #000;
  shadow-offset: {width: 3, height: 2};
  shadow-opacity: 0.8;
  shadow-radius: 2;
  elevation: 1;
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
      background-color: ${props => props.theme.infoMenu};
    `}
`;

const Bottom = styled.View`
  padding-top: 15;
  padding-bottom: 10;
`;

const IconDefault = Icon.extend``;

const WrapperIcon = styled.View`
  padding-top: 10;
`;
