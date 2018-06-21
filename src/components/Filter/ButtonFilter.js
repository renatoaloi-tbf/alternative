import React from 'react';
import styled from 'styled-components/native';
import {
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  withState,
  lifecycle
} from 'recompose';
import {func, object, bool} from 'prop-types';
import {connect} from 'react-redux';

import {Button, Text, IconUri, Icon} from '~/components/shared';

const enhance = compose(
  setPropTypes({
    isFilter: bool.isRequired,
    onPress: func.isRequired,
    date: object,
    close: func.isRequired
  }),
  withProps(({onPress}) => ({
    onPress: e => {
      if (typeof onPress === 'function') {
        onPress(e);
      }
    }
  }))
);

export const ButtonFilter = enhance(({onPress, isFilter, date, close}) => {
  return (
    <Wrapper>
      {!isFilter && (
        <WrapperView>
          <TextStyle>
            <Text>Mais recentes</Text>
          </TextStyle>
          <IconStyleLeft>
            <Button icon onPress={onPress}>
              <Icon size={25} name="filter-variant" />
            </Button>
          </IconStyleLeft>
        </WrapperView>
      )}
      {isFilter && (
        <WrapperSelected>
          <IconSytleRight>
            <IconUri name="dateRange" />
          </IconSytleRight>
          <WrapperTextRange>
            <TextRange inverted weight="900" size={12}>
              {date.startDate} - {date.endDate}
            </TextRange>
            {date.startDateComparation &&
              date.startDateComparation && (
                <Text inverted size={12}>
                  ({date.startDateComparation} - {date.endDateComparation})
                </Text>
              )}
          </WrapperTextRange>
          <IconStyleLeft>
            <Button icon onPress={close}>
              <IconUri size={25} name="closeWhite" />
            </Button>
          </IconStyleLeft>
        </WrapperSelected>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.View``;

const WrapperTextRange = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const WrapperView = styled.View`
  background-color: ${props => props.theme.bg};
  width: 100%;
  height: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const IconSytleRight = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 10;
`;

const IconStyleLeft = styled.View`
  align-items: flex-end;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 10;
`;
const TextStyle = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 10;
`;

const WrapperSelected = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.successMenu};
  width: 100%;
  height: 50;
`;

const TextRange = Text.extend`
  align-self: flex-start;
`;
