import React from 'react';
import {isEqual} from 'lodash';
import styled from 'styled-components/native';
import {string, number, bool} from 'prop-types';
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
import {getNavigatorContext} from '~/enhancers';
import {Text} from '~/components/shared';
import {isNumber} from '~/utils';

const enhance = compose(
  setPropTypes({
    average: number,
    total: number,
    month: string,
    collected: number,
    isCollected: bool
  }),
  defaultProps({
    average: 0,
    total: 0
  }),
  withProps(({onPress, type}) => ({
    onPress: e => {
      if (typeof onPress === 'function') {
        onPress(type);
      }
    }
  }))
);

export const VolumeAverage = enhance(
  ({total, average, month, collected, isCollected}) => {
    return (
      <Wrapper>
        <WrapperContentSelected>
          {isCollected ? (
            <StyleTextTotal>
              <Text size={12} inverted>
                Litros Coletados
              </Text>
              <Text inverted size={30}>
                {isNumber(collected)} L
              </Text>
            </StyleTextTotal>
          ) : (
            <StyleTextMonth>
              <Text size={12} inverted>
                Total - {month}
              </Text>
              <Text inverted size={30}>
                {isNumber(total)} L
              </Text>
            </StyleTextMonth>
          )}
        </WrapperContentSelected>
        <WrapperContent>
          <Text size={12} secondary>
            Média diária {month}
          </Text>
          <Text size={30} secondary>
            {average ? average.toLocaleString() : 0} L
          </Text>
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
