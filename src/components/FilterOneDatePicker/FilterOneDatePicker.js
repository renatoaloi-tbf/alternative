import React from 'react';
import styled, {css} from 'styled-components/native';
import {bool, string, func} from 'prop-types';
import {
  compose,
  withProps,
  setPropTypes,
  defaultProps,
  withState,
  pure
} from 'recompose';
import {isArray} from 'lodash';
import {Text, Button, Modal, Icon} from '~/components/shared';
import {DatePickerModal} from '~/components/DatePickerModal';

const enhance = compose(
  setPropTypes({
    title: string,
    buttonText: string,
    open: func,
    onClose: func,
    onPress: func,
    isFilter: bool,
    value: string
  }),
  withState('isVisible', 'setVisible', false),
  withProps(({onClose, setActive, setVisible, onPress}) => ({
    open: e => {
      setVisible(true);
    },
    onPress: e => {
      setVisible(false);
      if (typeof onPress === 'function') {
        onPress(e);
      }
    }
  })),
  pure
);

export const FilterOneDatePicker = enhance(
  ({title, onPress, buttonText, open, onClose, isVisible, isFilter, value}) => {
    return (
      <Wrapper>
        <WrapperView selected={!isFilter}>
          <TextStyle>
            <WrapperLeft>
              {!isFilter && <Icon name="calendar-range" inverted size={25} />}
              {isFilter && <Text>{value}</Text>}
              {!isFilter && <TextSelect inverted>{value}</TextSelect>}
            </WrapperLeft>
          </TextStyle>
          <IconStyleLeft>
            {isFilter && (
              <Button icon onPress={open}>
                <Icon size={25} name="filter-variant" opacity={0.57} />
              </Button>
            )}
            {!isFilter && (
              <Button icon onPress={onClose}>
                <Icon size={25} name="close" inverted />
              </Button>
            )}
          </IconStyleLeft>
          <DatePickerModal
            close={onPress}
            title="Selecione uma data"
            buttonText="Selecione"
            visible={isVisible}
          />
        </WrapperView>
      </Wrapper>
    );
  }
);

const Wrapper = styled.View`
  margin-top: 10;
`;

const WrapperLeft = styled.View`
  flex-direction: row;
  align-items: center;
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
  border-radius: ${props => props.theme.borderRadius};
`;

const Content = styled.View``;

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
  background-color: ${props => props.theme.bg};
  width: 100%;
  height: 50;
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

const TextSelect = Text.extend`
  padding-left: 5;
`;
