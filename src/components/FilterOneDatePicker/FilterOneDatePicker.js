import React from 'react';
import styled from 'styled-components/native';
import {bool, string, func} from 'prop-types';
import {
  compose,
  withProps,
  setPropTypes,
  defaultProps,
  withState
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
      console.log(e);
      if (typeof onPress === 'function') {
        onPress(e);
      }
    }
  }))
);

export const FilterOneDatePicker = enhance(
  ({title, onPress, buttonText, open, onClose, isVisible, isFilter, value}) => {
    return (
      <Wrapper>
        {!isFilter && (
          <WrapperView>
            <TextStyle>
              <Text>Mais recentes</Text>
            </TextStyle>
            <IconStyleLeft>
              <Button icon onPress={open}>
                <Icon size={25} name="filter-variant" />
              </Button>
            </IconStyleLeft>
            <DatePickerModal
              close={onPress}
              title="Selecione uma data"
              buttonText="Selecione"
              visible={isVisible}
            />
          </WrapperView>
        )}
        {isFilter && (
          <WrapperSelected>
            <TextStyle>
              <Text>{value}</Text>
            </TextStyle>
            <IconStyleLeft>
              <Button icon onPress={onClose}>
                <Icon size={25} name="close" />
              </Button>
            </IconStyleLeft>
          </WrapperSelected>
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
  width: 100%;
  height: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
