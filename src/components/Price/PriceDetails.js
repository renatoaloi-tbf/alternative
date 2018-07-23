import React from 'react';
import {isEqual} from 'lodash';
import styled from 'styled-components/native';
import {string, number, bool, object, func} from 'prop-types';
import {
  compose,
  setPropTypes,
  withProps,
  withHandlers,
  shouldUpdate,
  pure,
  defaultProps
} from 'recompose';
import moment from 'moment';

import Intl from 'intl';
require( 'intl/locale-data/jsonp/pt' );

// locals
import {getNavigatorContext} from '~/enhancers';
import {Text} from '~/components/shared';
import { View} from 'react-native';

const enhance = compose(
  setPropTypes({
    pricePeriod: object,
    pricePeriodAfter: object,
    previsao: func,
  }),
  withProps(({onPress, type, previsao}) => ({
    /* onPress: e => {
      if (typeof onPress === 'function') {
        onPress(type);
      }
    } */
    previsao: e => {
      if (typeof previsao === "function") {
        previsao(e);
      }
    },
  }))
);

export const PriceDetails = enhance(({pricePeriod, pricePeriodAfter, previsao}) => {
  if (__DEV__) console.log('Periodo preço', pricePeriod);
  return (
    <Wrapper>
      {pricePeriod && (
        <StyleTotal>
          <WrapperContentSelected>
            <Text size={12} inverted>
              {pricePeriod.period}
            </Text>
            <Text inverted size={28}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pricePeriod.y)}
            </Text>
          </WrapperContentSelected>
          <WrapperContent >
            <Text size={12} secondary onPress={previsao}>
              {pricePeriodAfter.period}
            </Text>
            <View  style={{flexDirection:'row'}}>
              <Text size={28} secondary onPress={previsao}>
                Previsão 
              </Text>
              <Text secondary onPress={previsao} style={{top: 5, fontSize: 25, marginLeft: 5, color: '#0096ff'}}>$</Text>
            </View>
          </WrapperContent>
        </StyleTotal>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.View`
  background-color: ${props => props.theme.bg};
  height: 90;
`;

const WrapperContentSelected = styled.View`
  background-color: ${props => props.theme.info};
  padding-top: 15;
  padding-bottom: 10;
  padding-left: 15;
  padding-right: 10;
  width: 50%;
  height: 90;
`;

const WrapperContent = styled.View`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  width: 50%;
  height: 90;
`;

const StyleTotal = styled.View`
  width: 100%;
  flex-direction: row;
`;
