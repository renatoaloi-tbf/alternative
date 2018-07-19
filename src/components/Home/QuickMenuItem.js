import React, {Component} from 'react';
import styled, {css} from 'styled-components/native';
import {compose, setPropTypes, withHandlers, pure} from 'recompose';
import {string} from 'prop-types';
import {TouchableOpacity, Image} from 'react-native';

import {Text, Icon, IconUri} from '~/components/shared';
import {getNavigatorContext} from '~/enhancers';
import {navigatorStyle} from '~/config';

const enhance = compose(
  getNavigatorContext,
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
  }),
  pure
);

class CardIcon extends Component {
  render(){
    switch (this.props.icon) {
    case 'certificate':
      return(
        <Image source={require('../../images/ic_quality.png')} 
        style={{ height: 50, width: 50, marginTop: 10 }} />
      );
    case 'beaker':
      return(
        <Image source={require('../../images/ic_bottle.png')} 
        style={{ height: 50, width: 50, marginTop: 10 }} />
      );
    case 'currency-usd':
      return(
        <Image source={require('../../images/ic_attach_money_black_24px.png')} 
        style={{ height: 50, width: 50, marginTop: 10 }} />
      );
    case 'file-document':
      return(
        <Image source={require('../../images/ic_description_black_24px.png')} 
        style={{ height: 50, width: 50, marginTop: 10 }} />
      );
    default:
      return false;
    }
  }
}

const QuickMenuItemEnhance = enhance(props => {
  return (
    <TouchableOpacityDefault {...props} onPress={props.goTo}>
      <CardIcon icon={props.icon} />
      <Text inverted size={20} weight={'bold'} style={{ paddingTop: 10 }}>
        {props.description}
      </Text>
    </TouchableOpacityDefault>
  );
});

export const QuickMenuItem = styled(QuickMenuItemEnhance)``;

const TouchableOpacityDefault = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 49%;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 1px 0px 3px #0f0f0f;
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
