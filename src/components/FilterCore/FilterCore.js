import React from 'react';
import styled, {css} from 'styled-components/native';
import {bool, string, func, number, oneOfType} from 'prop-types';
import {
  compose,
  withProps,
  setPropTypes,
  defaultProps,
  withState,
  pure,
  withHandlers
} from 'recompose';
import {isArray} from 'lodash';
import CheckBox from 'react-native-check-box';

import {Text, Button, Modal, Icon, Select} from '~/components/shared';

const enhance = compose(
  setPropTypes({
    isFilter: bool.isRequired,
    value: oneOfType([string, number]).isRequired,
    close: func,
    onChange: func,
    apply: func,
    isClose: bool,
    inverted: bool
  }),
  defaultProps({
    inverted: true
  }),
  withState('isVisible', 'setVisible', false),
  withState('compare', 'setCompare', false),
  withState('range', 'setRange', {}),
  withProps(({setVisible, onChange, apply, close, open}) => ({
    open: e => {
      setVisible(true);
      if (typeof open === 'function') {
        open();
      }
    },
    onChange: e => {
      console.log("FilterCore.js - onChange", e);
      if (typeof onChange === 'function') {
        onChange(e);
      }
    },
    onPress: e => {},
    close: e => {
      if (typeof close === 'function') {
        close();
      }
    },
    apply: e => {
      setVisible(false);
      if (typeof apply === 'function') {
        apply(e);
      }
    }
  })),
  withHandlers({
    onChangeInit: ({range, setRange, onChange}) => e => {
      console.log("FilterCore.js - onChangeInit", e);
      setRange({...range, startDate: e.value});
      onChange({...range, startDate: e.value});
    },
    onChangeEnd: ({range, setRange, onChange}) => e => {
      setRange({...range, endDate: e.value});
      onChange({...range, endDate: e.value});
    }
  })
);

export const FilterCore = enhance(
  ({
    open,
    isFilter,
    value,
    isVisible,
    close,
    compare,
    setCompare,
    onChangeInit,
    onChangeEnd,
    range,
    apply,
    isClose,
    inverted
  }) => {
    console.log("FilterCore.js - enhance", range);
    return (
      <Wrapper>
        {!isVisible && (
          <WrapperView selected={!isFilter}>
            <TextStyle>
              <WrapperLeft>
                {!isFilter && <Icon name="calendar-range" inverted size={25} />}
                {isFilter && <Text>{value}</Text>}
                {!isFilter && <TextSelect inverted>{value}</TextSelect>}
              </WrapperLeft>
            </TextStyle>
            <IconStyleLeft>
              {!isClose && (
                <Button icon onPress={open}>
                  <Icon size={25} name="filter-variant" opacity={0.57} />
                </Button>
              )}
              {isClose && (
                <Button icon onPress={close}>
                  <Icon size={25} name="close" inverted={inverted} />
                </Button>
              )}
            </IconStyleLeft>
          </WrapperView>
        )}
        {isVisible && (
          <DetailsCalender selected={isVisible}>
            <WrapperView selected={isVisible}>
              <TextStyle>
                <WrapperLeft>
                  <Text inverted>Selecionar periodo</Text>
                </WrapperLeft>
              </TextStyle>
              <IconStyleLeft>
                {isClose && (
                  <Button icon onPress={close}>
                    <Icon size={25} name="close" inverted />
                  </Button>
                )}
                {!isClose && (
                  <Button icon onPress={apply}>
                    <Icon inverted size={25} name="check" />
                  </Button>
                )}
              </IconStyleLeft>
            </WrapperView>
            <WrapperSelect>
              <WrapperRangeText>
                <Icon name="calendar-range" inverted size={25} />
                <RangeText size={14} inverted>
                  Periodo
                </RangeText>
              </WrapperRangeText>
            </WrapperSelect>
            <SelectRanger>
              <Select
                onPress={onChangeInit}
                title="Data início"
                buttonText="Selecionar"
              />
              <Select
                onPress={onChangeEnd}
                title="Data de término"
                buttonText="Pronto"
              />
            </SelectRanger>
            <WrapperCompareText>
              <CheckBoxStyle
                checkBoxColor="#fff"
                rightTextView={
                  <TextCheckBox inverted>
                    Comparar com ano antetior
                  </TextCheckBox>
                }
                onClick={() => setCompare(!compare)}
                isChecked={!compare}
              />
            </WrapperCompareText>
          </DetailsCalender>
        )}
      </Wrapper>
    );
  }
);

const Wrapper = styled.View`
  margin-top: 10;
`;

const WrapperView = styled.View`
  background-color: ${props => props.theme.bg};
  ${props =>
    props.selected &&
    css`
      background-color: ${props => props.theme.successMenu};
    `};
  width: 100%;
  height: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const WrapperSelect = styled.View`
  padding-left: 10;
  padding-right: 10;

  border-top-width: 0.5;
  border-top-color: #ffffff;
`;

const TextSelect = Text.extend`
  padding-left: 5;
`;

const WrapperLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;
const DetailsCalender = styled.View`
  ${props =>
    props.selected &&
    css`
      background-color: ${props => props.theme.successMenu};
    `};
`;

const RangeText = Text.extend`
  padding-left: 10;
`;

const WrapperRangeText = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 17;
  padding-top: 17;
`;
const SelectRanger = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10;
  padding-right: 10;
`;

const WrapperCompareText = styled.View`
  padding-top: 18;
  padding-bottom: 18;
  padding-left: 8;
  padding-right: 8;
`;

const CheckBoxStyle = styled(CheckBox)`
  background-color: ${props => props.theme.successMenu};
`;

const TextCheckBox = Text.extend`
  padding-left: 10;
`;
