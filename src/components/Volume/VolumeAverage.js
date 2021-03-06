import React from 'react';
import { isEqual } from 'lodash';
import styled from 'styled-components/native';
import { string, number, bool } from 'prop-types';
import {View} from 'react-native';
import {
  compose,
  setPropTypes,
  withProps,
  withHandlers,
  shouldUpdate,
  pure,
  defaultProps
} from 'recompose';

// locals
import { getNavigatorContext } from '~/enhancers';
import { Text } from '~/components/shared';
import { isNumber } from '~/utils';
import Intl from 'intl';
require( 'intl/locale-data/jsonp/pt' );

const enhance = compose(
  setPropTypes({
    average: number,
    total: number,
    month: string,
    lastMonth: string,
    collected: number,
    isCollected: bool,
    isCompare: bool,
    lastYear: string,
    percentual: string,
    totalAnoAnterior: number,
    totalAnoAtual: number
  }),
  defaultProps({
    average: 0,
    total: 0
  }),
  withProps(({ onPress, type }) => ({
    onPress: e => {
      if (typeof onPress === 'function') {
        onPress(type);
      }
    }
  }))
);

export const VolumeAverage = enhance(
  ({ total, average, month, collected, isCollected, lastMonth, lastYear, percentual, totalAnoAnterior, isCompare, totalAnoAtual }) => {
    return (
      <Wrapper>
        <WrapperContentSelected>
          {isCollected ? (
            <StyleTextTotal>
              <Text size={12} inverted>
                Litros Coletados
              </Text>
              {isCompare ? (
                <Text inverted size={30}>
                  {new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 0 }).format(totalAnoAtual ? totalAnoAtual : 0) } L
                </Text>
              ) : (
                <Text inverted size={30}>
                  {new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 0 }).format(collected ? collected : 0) } L
                </Text>
              )}
            </StyleTextTotal>
          ) : (
              <StyleTextMonth>
                <Text size={12} inverted>
                  Total - {month}
                </Text>
                <Text inverted size={30}>
                  { new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 0 }).format(total ? total : 0) } L
              </Text>
              </StyleTextMonth>
            )}
        </WrapperContentSelected>
        <WrapperContent>
          {isCompare ? (
            <StyleTextMonth>
              <Text size={12} secondary>
                Comparativo ({lastYear})
              </Text>
              <View style={{flexDirection: 'column'}}>
                <Text size={28} secondary>
                  {percentual}%
                </Text>
                <Text size={11} secondary>
                    ({new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 0 }).format(totalAnoAnterior)} L)
                </Text>
              </View>
            </StyleTextMonth>
          ) : (
              <StyleTextMonth>
                <Text size={12} secondary>
                  Média diária {lastMonth}
                </Text>
                <Text size={30} secondary>
                  { new Intl.NumberFormat('pt-BR', { style: 'decimal', maximumFractionDigits: 0 }).format(average ? average : 0)  } L
              </Text>
              </StyleTextMonth>
            )}
        </WrapperContent>
      </Wrapper>
    );
  }
);

const Wrapper = styled.View`
  background-color: ${props => props.theme.bg};
  flex-direction: row;
  height: 90;
`;

const WrapperContentSelected = styled.View`
  background-color: ${props => props.theme.info};
  padding-top: 15;
  padding-bottom: 10;
  padding-left: 15;
  padding-right: 10;
  width: 50%;
`;

const WrapperContent = styled.View`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  width: 50%;
`;

const StyleTextTotal = styled.View``;
const StyleTextMonth = styled.View``;
