import React from 'react';
import {isEqual} from 'lodash';
import styled from 'styled-components/native';
import {string, number, bool, object} from 'prop-types';
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

// locals
import {getNavigatorContext} from '~/enhancers';
import {Text} from '~/components/shared';

const enhance = compose(
  setPropTypes({
    pricePeriod: object
  }),
  withProps(({onPress, type}) => ({
    onPress: e => {
      if (typeof onPress === 'function') {
        onPress(type);
      }
    }
  }))
);

export const PriceDetails = enhance(({pricePeriod, pricePeriodAfter}) => {
  console.log('Periodo preço', pricePeriod);
  return (
    <Wrapper>
      {pricePeriod && (
        <StyleTotal>
          <WrapperContentSelected>
            <Text size={12} inverted>
              {pricePeriod.period}
            </Text>
            <Text inverted size={28}>
              R$ {pricePeriod.y}
            </Text>
          </WrapperContentSelected>
          <WrapperContent>
            <Text size={12} secondary>
              {pricePeriodAfter.period}
            </Text>
            <Text size={28} secondary>
              R$ {pricePeriodAfter.y}
            </Text>
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
