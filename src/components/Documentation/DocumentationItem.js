import React, { Component } from 'react';
import styled, {css} from 'styled-components/native';
import {compose, setPropTypes, withHandlers, pure, withProps, withState} from 'recompose';
import {string, func, array} from 'prop-types';
import {TouchableOpacity, Image} from 'react-native';

import {Text, Icon, IconUri} from '~/components/shared';
import {getNavigatorContext} from '~/enhancers';
import {navigatorStyle} from '~/config';

import {DocumentationModal} from './';

const enhance = compose(
  getNavigatorContext,
  pure,
  setPropTypes({
    icon: string.isRequired,
    description: string.isRequired,
    route: string.isRequired,
    demonstrative: string,
    month: string,
    value: string,
    onPress: func,
    setVisible: func,
    valores: array,
    valoresStatus: array,
    valoresPadrao: array,
    periodoIn62: string
  }),
  withState('isVisible', 'setVisible', false),
  withHandlers({
    onPress: ({onPress, setVisible}) => e => {
      setVisible(false);
      if (typeof onPress === 'function') {
        onPress(e);
      }
    },
    goTo: ({navigator, route, month, setVisible, description}) => () => {
      if (route === 'In62')
      {
        setVisible(true);
      }
      else 
      {
        navigator.push({
          screen: route,
          navigatorStyle,
          passProps: {
            mes: month,
            title: description
          }
        });
      }
    }
  })
);

const DocumentationItemEnhance = enhance(
  props => {
  return (

      <TouchableOpacityDefault {...props}>
        <WrapperIcon>
          <CardIcon icon={props.icon} />
        </WrapperIcon>
        <Body>
          <WrapperDescription>
            <Text align="center" inverted size={20} style={{ margin: 4}}>
              {props.description}
            </Text>
          </WrapperDescription>

          <WrapperDemonstrative>
            {props.value && (
              <TextDemonstrative align="center" inverted size={13}>
                {props.value}
              </TextDemonstrative>
            )}
          </WrapperDemonstrative>
        </Body>
        <Footer onPress={props.goTo}>
          <Text inverted>Visualizar</Text>
        </Footer>

        <DocumentationModal
            close={props.onPress}
            title="IN62"
            buttonText="Estou Ciente"
            visible={props.isVisible}
            valores={props.valores}
            valoresStatus={props.valoresStatus}
            valoresPadrao={props.valoresPadrao}
            periodoIn62={props.periodoIn62}
          />

      </TouchableOpacityDefault>
      
  );
});

export const DocumentationItem = styled(DocumentationItemEnhance)``;

class CardIcon extends Component {
  render(){
    switch (this.props.icon) {
    case 'statement':
      return(
        <Image source={require('../../images/ic_receipt_black_24px.png')} 
        style={{ height: 70, width: 70, marginTop: 10 }} />
      );
    case 'currency-usd':
      return(
        <Image source={require('../../images/ic_attach_money_black_24px.png')} 
        style={{ height: 70, width: 70, marginTop: 10 }} />
      );
    case 'onenote':
      return(
        <Image source={require('../../images/ic_nf.png')} 
        style={{ height: 70, width: 70, marginTop: 10 }} />
      );
    case 'note':
      return(
        <Image source={require('../../images/ic_ir.png')} 
        style={{ height: 70, width: 70, marginTop: 10 }} />
      );
    case 'alert':
      return(
        <Image source={require('../../images/ic_warning_black_24px.png')} 
        style={{ height: 70, width: 70, marginTop: 10 }} />
      );
    default:
      return false;
    }
  }
}

const TouchableOpacityDefault = styled.View`
  align-items: center;
  width: 49%;
  border-radius: ${props => props.theme.borderRadius};
  margin-top: 8;
  box-shadow: 1px 0px 3px #0f0f0f;
  elevation: 3;

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
  border-radius: ${props => props.theme.borderRadius};
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
